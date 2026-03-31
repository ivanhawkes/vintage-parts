package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/ivanhawkes/snowflake/strategy"
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

	// Set the epoch to zero, the built-in default value will be used.
	epoch := time.Time{}

	// Create a pool of strategies to work with.
	sp, err := strategy.NewStrategyPool(epoch, 24, 0, 16, global.Logs)
	if err != nil {
		global.Logs.Fatal("Failed to create a snowflake strategy pool.")
	}
	global.SPool = sp

	// Create a new MUX server.
	server := api.NewServer()
	r := chi.NewMux()

	// Basic CORS
	// for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	h := api.HandlerFromMux(server, r)
	s := &http.Server{
		Handler: h,
		Addr:    "0.0.0.0:8080",
	}

	global.Logs.Info("Started listening", zap.Int32("Port", 8080), zap.String("Time", t.Format(time.RFC3339)))

	// Ere the world ends...
	log.Fatal(s.ListenAndServe())
}
