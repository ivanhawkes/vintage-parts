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

func ScanRowUserPart(rows pgx.Rows) UserPart {

	dest := UserPart{}

	err := rows.Scan(
		&dest.UserPartId,
		&dest.UserId,
		&dest.PartId,
		&dest.StorageBinsId,
		&dest.ColumnNumber,
		&dest.RowNumber,
		&dest.Quantity)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the userParts.
// (GET /userParts)
func (Server) GetUserParts(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_user_parts_list ();"

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
		var list UserPartList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowUserPart(rows)
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

// Create a new userPart
// (POST /userParts)
func (Server) PostUserParts(w http.ResponseWriter, r *http.Request) {
	var entity UserPart

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_user_parts_create (%d, %d, %d, %d, %d, %d);",
		entity.UserId,
		entity.PartId,
		entity.StorageBinsId,
		entity.ColumnNumber,
		entity.RowNumber,
		entity.Quantity)

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
		list := ScanRowUserPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a userPart
// (DELETE /userParts/{PrimaryKeyId})
func (Server) DeleteUserPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_user_parts_delete (%d);", primaryKeyId)

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
		list := ScanRowUserPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a userPart
// (GET /userParts/{PrimaryKeyId})
func (Server) GetUserPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_user_parts_read (%d);", primaryKeyId)

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
		list := ScanRowUserPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing userPart
// (PUT /userParts/{PrimaryKeyId})
func (Server) PutUserPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity UserPart

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_user_parts_update (%d, %d, %d, %d, %d, %d, %d);",
		primaryKeyId,
		entity.UserId,
		entity.PartId,
		entity.StorageBinsId,
		entity.ColumnNumber,
		entity.RowNumber,
		entity.Quantity)

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
		list := ScanRowUserPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
