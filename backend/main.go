package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/ivanhawkes/vintage-parts/api"
	"github.com/ivanhawkes/vintage-parts/global"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

func main() {
	var err error

	// Provide a global logging solution.
	global.Logs, _ = zap.NewProduction()
	defer global.Logs.Sync()

	// Load the environment.
	err = godotenv.Load(".env")
	if err != nil {
		global.Logs.Fatal("Failed to load the environment file .env", zap.Error(err))
	}

	global.DBPool, err = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		global.Logs.Fatal("Unable to create connection pool", zap.Error(err))
	}
	defer global.DBPool.Close()

	var t time.Time
	err = global.DBPool.QueryRow(context.Background(), "SELECT * FROM NOW ();").Scan(&t)
	if err != nil {
		global.Logs.Fatal("QUERY", zap.Error(err))
	}

	// Create a new MUX server.
	server := api.NewServer()
	r := chi.NewMux()
	h := api.HandlerFromMux(server, r)
	s := &http.Server{
		Handler: h,
		Addr:    "0.0.0.0:8080",
	}

	global.Logs.Info("Started listening", zap.Int32("Port", 8080), zap.String("Time", t.Format(time.RFC3339)))

	// Ere the world ends...
	log.Fatal(s.ListenAndServe())
}
