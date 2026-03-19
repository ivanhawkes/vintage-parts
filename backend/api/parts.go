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

func ScanRowPart(rows pgx.Rows) Part {

	dest := Part{}

	err := rows.Scan(
		&dest.PartId,
		&dest.PartTypeId,
		&dest.PartNumber,
		&dest.Series,
		&dest.Description,
		&dest.ManufacturerId,
		&dest.ProductUrl,
		&dest.ImageUrl,
		&dest.DatasheetUrl)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the parts.
// (GET /parts)
func (Server) GetParts(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_parts_list ();"

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
		var list PartList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowPart(rows)
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

// Create a new part
// (POST /parts)
func (Server) PostParts(w http.ResponseWriter, r *http.Request) {
	var entity Part

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_parts_create (%d, '%s', %s, %s, %d, %s, %s, %s);",
		NullOrValueFK(entity.PartTypeId),
		entity.PartNumber,
		NullOrValue(entity.Series),
		NullOrValue(entity.Description),
		entity.ManufacturerId,
		NullOrValue(entity.ProductUrl),
		NullOrValue(entity.ImageUrl),
		NullOrValue(entity.DatasheetUrl))

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
		list := ScanRowPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a part
// (DELETE /parts/{PrimaryKeyId})
func (Server) DeletePartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_parts_delete (%d);", primaryKeyId)

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
		list := ScanRowPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a part
// (GET /parts/{PrimaryKeyId})
func (Server) GetPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_parts_read (%d);", primaryKeyId)

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
		list := ScanRowPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing part
// (PUT /parts/{PrimaryKeyId})
func (Server) PutPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity Part

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_parts_update (%d, %d, '%s', %s, %s, %d, %s, %s, %s);",
		primaryKeyId,
		NullOrValueFK(entity.PartTypeId),
		entity.PartNumber,
		NullOrValue(entity.Series),
		NullOrValue(entity.Description),
		entity.ManufacturerId,
		NullOrValue(entity.ProductUrl),
		NullOrValue(entity.ImageUrl),
		NullOrValue(entity.DatasheetUrl))

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
		list := ScanRowPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
