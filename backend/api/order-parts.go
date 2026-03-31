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

func ScanRowOrderPart(rows pgx.Rows) OrderPart {

	dest := OrderPart{}

	err := rows.Scan(
		&dest.OrderPartId,
		&dest.OrderId,
		&dest.PartId,
		&dest.Quantity,
		&dest.UnitPrice,
		&dest.SupplierPartNumber,
		&dest.ManufacturerPartNumber,
		&dest.ManufacturerName,
		&dest.Description)

	if err != nil {
		global.Logs.Error("Database result set couldn't be scanned", zap.Error(err))
	}

	return dest
}

// Returns a list of all the orderParts.
// (GET /orderParts)
func (Server) GetOrderParts(w http.ResponseWriter, r *http.Request) {
	// Build a query.
	query := "SELECT * FROM cp_order_parts_list ();"

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
		var list OrderPartList

		// Append all the rows to an array.
		for isRows {
			entity := ScanRowOrderPart(rows)
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

// Create a new orderPart
// (POST /orderParts)
func (Server) PostOrderParts(w http.ResponseWriter, r *http.Request) {
	var entity OrderPart

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Get the next ID from the strategy pool using round robin.
	st := global.SPool.Next()
	id := st.NextID()

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_order_parts_create (%d, %d, %d, %d, %g, '%s', '%s', '%s', %s);",
		id,
		entity.OrderId,
		entity.PartId,
		entity.Quantity,
		entity.UnitPrice,
		entity.SupplierPartNumber,
		entity.ManufacturerPartNumber,
		entity.ManufacturerName,
		NullOrValue(entity.Description))

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
		list := ScanRowOrderPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Delete a orderPart
// (DELETE /orderParts/{PrimaryKeyId})
func (Server) DeleteOrderPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_order_parts_delete (%d);", primaryKeyId)

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
		list := ScanRowOrderPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Read a orderPart
// (GET /orderParts/{PrimaryKeyId})
func (Server) GetOrderPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	query := fmt.Sprintf("SELECT * FROM cp_order_parts_read (%d);", primaryKeyId)

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
		list := ScanRowOrderPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)

	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}

// Update an existing orderPart
// (PUT /orderParts/{PrimaryKeyId})
func (Server) PutOrderPartsPrimaryKeyId(w http.ResponseWriter, r *http.Request, primaryKeyId PrimaryKeyId) {
	var entity OrderPart

	// Decode the JSON.
	if err := json.NewDecoder(r.Body).Decode(&entity); err != nil {
		global.Logs.Error("DECODE", zap.Error(err))
		return
	}

	// Build a query.
	query := fmt.Sprintf("SELECT * FROM cp_order_parts_update (%d, %d, %d, %d, %g, '%s', '%s', '%s', %s);",
		primaryKeyId,
		entity.OrderId,
		entity.PartId,
		entity.Quantity,
		entity.UnitPrice,
		entity.SupplierPartNumber,
		entity.ManufacturerPartNumber,
		entity.ManufacturerName,
		NullOrValue(entity.Description))

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
		list := ScanRowOrderPart(rows)

		// Write a response.
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(list)
	} else {
		// Resource not found.
		w.WriteHeader(http.StatusNotFound)
	}
}
