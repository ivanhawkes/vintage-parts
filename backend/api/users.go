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

func ScanRowUser(rows pgx.Rows) User {

	dest := User{}

	err := rows.Scan(
		&dest.UserId,
		&dest.UserName,
		&dest.Email,
		&dest.MouserApiKeyOrders,
		&dest.MouserApiKeySearch)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the users.
// (GET /users)
func (Server) GetUsers(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_users_list ();"
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
		var list UserList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowUser(rows)
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

// Create a new user
// (POST /users)
func (Server) PostUsers(w http.ResponseWriter, r *http.Request) {
	var entity User

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_users_create ('%s', '%s', %s, %s);",
		entity.UserName,
		entity.Email,
		NullOrValue(entity.MouserApiKeyOrders),
		NullOrValue(entity.MouserApiKeySearch))

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
		list := ScanRowUser(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a user
// (DELETE /users/{PrimaryKeyId})
func (Server) DeleteUsersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_users_delete (%d);", primaryKeyId)

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
		list := ScanRowUser(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a user
// (GET /users/{PrimaryKeyId})
func (Server) GetUsersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_users_read (%d);", primaryKeyId)
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
		list := ScanRowUser(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing user
// (PUT /users/{PrimaryKeyId})
func (Server) PutUsersPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity User

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_users_update (%d, '%s', '%s', %s, %s);",
		primaryKeyId,
		entity.UserName,
		entity.Email,
		NullOrValue(entity.MouserApiKeyOrders),
		NullOrValue(entity.MouserApiKeySearch))

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
		list := ScanRowUser(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
