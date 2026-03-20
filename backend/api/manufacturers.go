package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ivanhawkes/vintage-parts/global"
	"github.com/jackc/pgx/v5"
	"go.uber.org/zap"
)

func ScanRowManufacturer(rows pgx.Rows) Manufacturer {

	dest := Manufacturer{}

	err := rows.Scan(
		&dest.ManufacturerId,
		&dest.ManufacturerName,
		&dest.Description,
		&dest.ManufacturerUrl,
		&dest.Aliases)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the manufacturers.
// (GET /manufacturers)
func (Server) GetManufacturers(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_manufacturers_list ();"
	global.Logs.Info(query)

	// Send it to the DB.
	rows, err := global.DBPool.Query(context.Background(), query)
	if err != nil {
		global.Logs.Error("Query failed to execute", zap.Error(err))
		return
	}
	defer rows.Close()

	// Set JSON as the return type.
	w.Header().Set("Content-Type", "application/json")

	isRows := rows.Next()
	if isRows {
		var list ManufacturerList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowManufacturer(rows)
			list = append(list, entity)
			isRows = rows.Next()
		}

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Create a new manufacturer
// (POST /manufacturers)
func (Server) PostManufacturers(w http.ResponseWriter, r *http.Request) {
	var entity Manufacturer

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_manufacturers_create ('%s', %s, %s, %s);",
		entity.ManufacturerName,
		NullOrValue(entity.Description),
		NullOrValue(entity.ManufacturerUrl),
		NullOrValue(entity.Aliases))

	// Send it to the DB.
	rows, err := global.DBPool.Query(context.Background(), query)
	if err != nil {
		global.Logs.Error("Query failed to execute", zap.Error(err))
		return
	}
	defer rows.Close()

	// Set JSON as the return type.
	w.Header().Set("Content-Type", "application/json")

	// Scan the results from the query.
	if rows.Next() {
		list := ScanRowManufacturer(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a manufacturer
// (DELETE /manufacturers/{PrimaryKeyId})
func (Server) DeleteManufacturersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_manufacturers_delete (%d);", primaryKeyId)

	// Send it to the DB.
	rows, err := global.DBPool.Query(context.Background(), query)
	if err != nil {
		global.Logs.Error("Query failed to execute", zap.Error(err))
		return
	}
	defer rows.Close()

	// Set JSON as the return type.
	w.Header().Set("Content-Type", "application/json")

	// Scan the results from the query.
	if rows.Next() {
		list := ScanRowManufacturer(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a manufacturer
// (GET /manufacturers/{PrimaryKeyId})
func (Server) GetManufacturersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_manufacturers_read (%d);", primaryKeyId)
	global.Logs.Info(query)

	rows, err := global.DBPool.Query(context.Background(), query)
	if err != nil {
		global.Logs.Error("Query failed to execute", zap.Error(err))
		return
	}
	defer rows.Close()

	// Set JSON as the return type.
	w.Header().Set("Content-Type", "application/json")

	// Scan the results from the query.
	if rows.Next() {
		list := ScanRowManufacturer(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing manufacturer
// (PUT /manufacturers/{PrimaryKeyId})
func (Server) PutManufacturersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity Manufacturer

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_manufacturers_update (%d, '%s', %s, %s, %s);",
		primaryKeyId,
		entity.ManufacturerName,
		NullOrValue(entity.Description),
		NullOrValue(entity.ManufacturerUrl),
		NullOrValue(entity.Aliases))

	// Send it to the DB.
	rows, err := global.DBPool.Query(context.Background(), query)
	if err != nil {
		global.Logs.Error("Query failed to execute", zap.Error(err))
		return
	}
	defer rows.Close()

	// Set JSON as the return type.
	w.Header().Set("Content-Type", "application/json")

	// Scan the results from the query.
	if rows.Next() {
		list := ScanRowManufacturer(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
