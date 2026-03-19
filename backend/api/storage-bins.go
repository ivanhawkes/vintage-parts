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

func ScanRowStorageBin(rows pgx.Rows) StorageBin {

	dest := StorageBin{}

	err := rows.Scan(
		&dest.StorageBinId,
		&dest.UserId,
		&dest.ShortName,
		&dest.LongName,
		&dest.Description,
		&dest.Location,
		&dest.MaxColumn,
		&dest.MaxRow)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the storageBins.
// (GET /storageBins)
func (Server) GetStorageBins(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_storage_bins_list ();"

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
		var list StorageBinList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowStorageBin(rows)
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

// Create a new storageBin
// (POST /storageBins)
func (Server) PostStorageBins(w http.ResponseWriter, r *http.Request) {
	var entity StorageBin

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_storage_bins_create (%d, '%s', '%s', %s, %s, %d, %d);",
		entity.UserId,
		entity.ShortName,
		entity.LongName,
		NullOrValue(entity.Description),
		NullOrValue(entity.Location),
		NullOrValueInt(entity.MaxColumn),
		NullOrValueInt(entity.MaxRow))

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
		list := ScanRowStorageBin(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a storageBin
// (DELETE /storageBins/{PrimaryKeyId})
func (Server) DeleteStorageBinsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_storage_bins_delete (%d);", primaryKeyId)

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
		list := ScanRowStorageBin(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a storageBin
// (GET /storageBins/{PrimaryKeyId})
func (Server) GetStorageBinsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_storage_bins_read (%d);", primaryKeyId)

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
		list := ScanRowStorageBin(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing storageBin
// (PUT /storageBins/{PrimaryKeyId})
func (Server) PutStorageBinsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity StorageBin

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_storage_bins_update (%d, %d, '%s', '%s', %s, %s, %d, %d);",
		primaryKeyId,
		entity.UserId,
		entity.ShortName,
		entity.LongName,
		NullOrValue(entity.Description),
		NullOrValue(entity.Location),
		NullOrValueInt(entity.MaxColumn),
		NullOrValueInt(entity.MaxRow))

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
		list := ScanRowStorageBin(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
