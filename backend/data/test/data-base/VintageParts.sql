
DROP FUNCTION IF EXISTS cp_manufacturers_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_manufacturers_create (
	manufacturer_name VARCHAR (60), description VARCHAR (255), 
	manufacturer_url VARCHAR (255), aliases VARCHAR (255))
RETURNS SETOF manufacturers AS

$BODY$

INSERT INTO manufacturers AS m (
	manufacturer_name,
	description,
	manufacturer_url,
	aliases)
VALUES (
	cp_manufacturers_create.manufacturer_name,
	cp_manufacturers_create.description,
	cp_manufacturers_create.manufacturer_url,
	cp_manufacturers_create.aliases)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_manufacturers_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_manufacturers_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_manufacturers_update (
	manufacturer_id BIGINT, manufacturer_name VARCHAR (60), description VARCHAR (255), 
	manufacturer_url VARCHAR (255), aliases VARCHAR (255))
RETURNS SETOF manufacturers AS

$BODY$

UPDATE manufacturers AS m SET
	manufacturer_name = cp_manufacturers_update.manufacturer_name,
	description = cp_manufacturers_update.description,
	manufacturer_url = cp_manufacturers_update.manufacturer_url,
	aliases = cp_manufacturers_update.aliases
WHERE (m.manufacturer_id = cp_manufacturers_update.manufacturer_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_manufacturers_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_manufacturers_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_manufacturers_delete (
	manufacturer_id BIGINT)
RETURNS SETOF manufacturers AS

$BODY$

DELETE FROM manufacturers AS m
WHERE (m.manufacturer_id = cp_manufacturers_delete.manufacturer_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_manufacturers_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_manufacturers_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_manufacturers_read (
	manufacturer_id BIGINT)
RETURNS SETOF manufacturers AS

$BODY$

SELECT *
FROM manufacturers AS m
WHERE (m.manufacturer_id = cp_manufacturers_read.manufacturer_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_manufacturers_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_manufacturers_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_manufacturers_exists (
	manufacturer_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM manufacturers AS m
WHERE (m.manufacturer_id = cp_manufacturers_exists.manufacturer_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_manufacturers_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_manufacturers_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_manufacturers_list ()
RETURNS SETOF manufacturers AS

$BODY$

SELECT *
FROM manufacturers AS m
ORDER BY m.manufacturer_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_manufacturers_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_order_parts_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_order_parts_create (
	order_id BIGINT, part_id BIGINT, 
	quantity INT, unit_price REAL, supplier_part_number VARCHAR (32), 
	manufacturer_part_number VARCHAR (32), manufacturer_name VARCHAR (60), description VARCHAR (255))
RETURNS SETOF order_parts AS

$BODY$

INSERT INTO order_parts AS o (
	order_id,
	part_id,
	quantity,
	unit_price,
	supplier_part_number,
	manufacturer_part_number,
	manufacturer_name,
	description)
VALUES (
	cp_order_parts_create.order_id,
	cp_order_parts_create.part_id,
	cp_order_parts_create.quantity,
	cp_order_parts_create.unit_price,
	cp_order_parts_create.supplier_part_number,
	cp_order_parts_create.manufacturer_part_number,
	cp_order_parts_create.manufacturer_name,
	cp_order_parts_create.description)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_order_parts_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_order_parts_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_order_parts_update (
	order_part_id BIGINT, order_id BIGINT, part_id BIGINT, 
	quantity INT, unit_price REAL, supplier_part_number VARCHAR (32), 
	manufacturer_part_number VARCHAR (32), manufacturer_name VARCHAR (60), description VARCHAR (255))
RETURNS SETOF order_parts AS

$BODY$

UPDATE order_parts AS o SET
	order_id = cp_order_parts_update.order_id,
	part_id = cp_order_parts_update.part_id,
	quantity = cp_order_parts_update.quantity,
	unit_price = cp_order_parts_update.unit_price,
	supplier_part_number = cp_order_parts_update.supplier_part_number,
	manufacturer_part_number = cp_order_parts_update.manufacturer_part_number,
	manufacturer_name = cp_order_parts_update.manufacturer_name,
	description = cp_order_parts_update.description
WHERE (o.order_part_id = cp_order_parts_update.order_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_order_parts_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_order_parts_delete (
	order_part_id BIGINT)
RETURNS SETOF order_parts AS

$BODY$

DELETE FROM order_parts AS o
WHERE (o.order_part_id = cp_order_parts_delete.order_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_order_parts_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_order_parts_read (
	order_part_id BIGINT)
RETURNS SETOF order_parts AS

$BODY$

SELECT *
FROM order_parts AS o
WHERE (o.order_part_id = cp_order_parts_read.order_part_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_order_parts_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_order_parts_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_order_parts_exists (
	order_part_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM order_parts AS o
WHERE (o.order_part_id = cp_order_parts_exists.order_part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_order_parts_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_order_parts_list ()
RETURNS SETOF order_parts AS

$BODY$

SELECT *
FROM order_parts AS o
ORDER BY o.supplier_part_number;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_order_parts_by_order_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_order_parts_by_order_id_list (
		order_id BIGINT)
RETURNS SETOF order_parts AS

$BODY$

SELECT *
FROM order_parts AS o
WHERE (o.order_id = cp_order_parts_by_order_id_list.order_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_by_order_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_order_parts_by_part_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_order_parts_by_part_id_list (
		part_id BIGINT)
RETURNS SETOF order_parts AS

$BODY$

SELECT *
FROM order_parts AS o
WHERE (o.part_id = cp_order_parts_by_part_id_list.part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_order_parts_by_part_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_orders_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_orders_create (
	user_id BIGINT, supplier_id BIGINT, 
	order_date DATE, order_number VARCHAR (24), currency_code CHAR (3), 
	status SMALLINT)
RETURNS SETOF orders AS

$BODY$

INSERT INTO orders AS o (
	user_id,
	supplier_id,
	order_date,
	order_number,
	currency_code,
	status)
VALUES (
	cp_orders_create.user_id,
	cp_orders_create.supplier_id,
	cp_orders_create.order_date,
	cp_orders_create.order_number,
	cp_orders_create.currency_code,
	cp_orders_create.status)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_orders_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_orders_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_orders_update (
	order_id BIGINT, user_id BIGINT, supplier_id BIGINT, 
	order_date DATE, order_number VARCHAR (24), currency_code CHAR (3), 
	status SMALLINT)
RETURNS SETOF orders AS

$BODY$

UPDATE orders AS o SET
	user_id = cp_orders_update.user_id,
	supplier_id = cp_orders_update.supplier_id,
	order_date = cp_orders_update.order_date,
	order_number = cp_orders_update.order_number,
	currency_code = cp_orders_update.currency_code,
	status = cp_orders_update.status
WHERE (o.order_id = cp_orders_update.order_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_orders_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_orders_delete (
	order_id BIGINT)
RETURNS SETOF orders AS

$BODY$

DELETE FROM orders AS o
WHERE (o.order_id = cp_orders_delete.order_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_orders_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_orders_read (
	order_id BIGINT)
RETURNS SETOF orders AS

$BODY$

SELECT *
FROM orders AS o
WHERE (o.order_id = cp_orders_read.order_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_orders_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_orders_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_orders_exists (
	order_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM orders AS o
WHERE (o.order_id = cp_orders_exists.order_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_orders_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_orders_list ()
RETURNS SETOF orders AS

$BODY$

SELECT *
FROM orders AS o
ORDER BY o.order_number;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_orders_by_supplier_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_orders_by_supplier_id_list (
		supplier_id BIGINT)
RETURNS SETOF orders AS

$BODY$

SELECT *
FROM orders AS o
WHERE (o.supplier_id = cp_orders_by_supplier_id_list.supplier_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_by_supplier_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_orders_by_user_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_orders_by_user_id_list (
		user_id BIGINT)
RETURNS SETOF orders AS

$BODY$

SELECT *
FROM orders AS o
WHERE (o.user_id = cp_orders_by_user_id_list.user_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_orders_by_user_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_part_types_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_part_types_create (
	parent_id INT, short_name VARCHAR (60), 
	long_name VARCHAR (120), mouser_url VARCHAR (255))
RETURNS SETOF part_types AS

$BODY$

INSERT INTO part_types AS p (
	parent_id,
	short_name,
	long_name,
	mouser_url)
VALUES (
	cp_part_types_create.parent_id,
	cp_part_types_create.short_name,
	cp_part_types_create.long_name,
	cp_part_types_create.mouser_url)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_part_types_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_part_types_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_part_types_update (
	part_type_id BIGINT, parent_id INT, short_name VARCHAR (60), 
	long_name VARCHAR (120), mouser_url VARCHAR (255))
RETURNS SETOF part_types AS

$BODY$

UPDATE part_types AS p SET
	parent_id = cp_part_types_update.parent_id,
	short_name = cp_part_types_update.short_name,
	long_name = cp_part_types_update.long_name,
	mouser_url = cp_part_types_update.mouser_url
WHERE (p.part_type_id = cp_part_types_update.part_type_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_part_types_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_part_types_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_part_types_delete (
	part_type_id BIGINT)
RETURNS SETOF part_types AS

$BODY$

DELETE FROM part_types AS p
WHERE (p.part_type_id = cp_part_types_delete.part_type_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_part_types_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_part_types_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_part_types_read (
	part_type_id BIGINT)
RETURNS SETOF part_types AS

$BODY$

SELECT *
FROM part_types AS p
WHERE (p.part_type_id = cp_part_types_read.part_type_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_part_types_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_part_types_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_part_types_exists (
	part_type_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM part_types AS p
WHERE (p.part_type_id = cp_part_types_exists.part_type_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_part_types_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_part_types_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_part_types_list ()
RETURNS SETOF part_types AS

$BODY$

SELECT *
FROM part_types AS p
ORDER BY p.short_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_part_types_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_parts_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_parts_create (
	part_type_id BIGINT, part_number VARCHAR (32), 
	series VARCHAR (32), description VARCHAR (255), manufacturer_id BIGINT, 
	product_url VARCHAR (255), image_url VARCHAR (255), datasheet_url VARCHAR (255))
RETURNS SETOF parts AS

$BODY$

INSERT INTO parts AS p (
	part_type_id,
	part_number,
	series,
	description,
	manufacturer_id,
	product_url,
	image_url,
	datasheet_url)
VALUES (
	cp_parts_create.part_type_id,
	cp_parts_create.part_number,
	cp_parts_create.series,
	cp_parts_create.description,
	cp_parts_create.manufacturer_id,
	cp_parts_create.product_url,
	cp_parts_create.image_url,
	cp_parts_create.datasheet_url)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_parts_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_parts_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_parts_update (
	part_id BIGINT, part_type_id BIGINT, part_number VARCHAR (32), 
	series VARCHAR (32), description VARCHAR (255), manufacturer_id BIGINT, 
	product_url VARCHAR (255), image_url VARCHAR (255), datasheet_url VARCHAR (255))
RETURNS SETOF parts AS

$BODY$

UPDATE parts AS p SET
	part_type_id = cp_parts_update.part_type_id,
	part_number = cp_parts_update.part_number,
	series = cp_parts_update.series,
	description = cp_parts_update.description,
	manufacturer_id = cp_parts_update.manufacturer_id,
	product_url = cp_parts_update.product_url,
	image_url = cp_parts_update.image_url,
	datasheet_url = cp_parts_update.datasheet_url
WHERE (p.part_id = cp_parts_update.part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_parts_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_parts_delete (
	part_id BIGINT)
RETURNS SETOF parts AS

$BODY$

DELETE FROM parts AS p
WHERE (p.part_id = cp_parts_delete.part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_parts_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_parts_read (
	part_id BIGINT)
RETURNS SETOF parts AS

$BODY$

SELECT *
FROM parts AS p
WHERE (p.part_id = cp_parts_read.part_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_parts_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_parts_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_parts_exists (
	part_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM parts AS p
WHERE (p.part_id = cp_parts_exists.part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_parts_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_parts_list ()
RETURNS SETOF parts AS

$BODY$

SELECT *
FROM parts AS p
ORDER BY p.part_number;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_parts_by_manufacturer_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_parts_by_manufacturer_id_list (
		manufacturer_id BIGINT)
RETURNS SETOF parts AS

$BODY$

SELECT *
FROM parts AS p
WHERE (p.manufacturer_id = cp_parts_by_manufacturer_id_list.manufacturer_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_by_manufacturer_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_parts_by_part_type_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_parts_by_part_type_id_list (
		part_type_id BIGINT)
RETURNS SETOF parts AS

$BODY$

SELECT *
FROM parts AS p
WHERE (p.part_type_id = cp_parts_by_part_type_id_list.part_type_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_parts_by_part_type_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_project_parts_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_project_parts_create (
	project_id BIGINT, part_id BIGINT, 
	quantity INT)
RETURNS SETOF project_parts AS

$BODY$

INSERT INTO project_parts AS p (
	project_id,
	part_id,
	quantity)
VALUES (
	cp_project_parts_create.project_id,
	cp_project_parts_create.part_id,
	cp_project_parts_create.quantity)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_project_parts_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_project_parts_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_project_parts_update (
	project_part_id BIGINT, project_id BIGINT, part_id BIGINT, 
	quantity INT)
RETURNS SETOF project_parts AS

$BODY$

UPDATE project_parts AS p SET
	project_id = cp_project_parts_update.project_id,
	part_id = cp_project_parts_update.part_id,
	quantity = cp_project_parts_update.quantity
WHERE (p.project_part_id = cp_project_parts_update.project_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_project_parts_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_project_parts_delete (
	project_part_id BIGINT)
RETURNS SETOF project_parts AS

$BODY$

DELETE FROM project_parts AS p
WHERE (p.project_part_id = cp_project_parts_delete.project_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_project_parts_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_project_parts_read (
	project_part_id BIGINT)
RETURNS SETOF project_parts AS

$BODY$

SELECT *
FROM project_parts AS p
WHERE (p.project_part_id = cp_project_parts_read.project_part_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_project_parts_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_project_parts_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_project_parts_exists (
	project_part_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM project_parts AS p
WHERE (p.project_part_id = cp_project_parts_exists.project_part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_project_parts_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_project_parts_list ()
RETURNS SETOF project_parts AS

$BODY$

SELECT *
FROM project_parts AS p;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_project_parts_by_part_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_project_parts_by_part_id_list (
		part_id BIGINT)
RETURNS SETOF project_parts AS

$BODY$

SELECT *
FROM project_parts AS p
WHERE (p.part_id = cp_project_parts_by_part_id_list.part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_by_part_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_project_parts_by_project_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_project_parts_by_project_id_list (
		project_id BIGINT)
RETURNS SETOF project_parts AS

$BODY$

SELECT *
FROM project_parts AS p
WHERE (p.project_id = cp_project_parts_by_project_id_list.project_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_project_parts_by_project_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_projects_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_projects_create (
	user_id BIGINT, project_name VARCHAR (60), 
	description VARCHAR (255), notes TEXT)
RETURNS SETOF projects AS

$BODY$

INSERT INTO projects AS p (
	user_id,
	project_name,
	description,
	notes)
VALUES (
	cp_projects_create.user_id,
	cp_projects_create.project_name,
	cp_projects_create.description,
	cp_projects_create.notes)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_projects_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_projects_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_projects_update (
	project_id BIGINT, user_id BIGINT, project_name VARCHAR (60), 
	description VARCHAR (255), notes TEXT)
RETURNS SETOF projects AS

$BODY$

UPDATE projects AS p SET
	user_id = cp_projects_update.user_id,
	project_name = cp_projects_update.project_name,
	description = cp_projects_update.description,
	notes = cp_projects_update.notes
WHERE (p.project_id = cp_projects_update.project_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_projects_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_projects_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_projects_delete (
	project_id BIGINT)
RETURNS SETOF projects AS

$BODY$

DELETE FROM projects AS p
WHERE (p.project_id = cp_projects_delete.project_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_projects_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_projects_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_projects_read (
	project_id BIGINT)
RETURNS SETOF projects AS

$BODY$

SELECT *
FROM projects AS p
WHERE (p.project_id = cp_projects_read.project_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_projects_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_projects_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_projects_exists (
	project_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM projects AS p
WHERE (p.project_id = cp_projects_exists.project_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_projects_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_projects_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_projects_list ()
RETURNS SETOF projects AS

$BODY$

SELECT *
FROM projects AS p
ORDER BY p.project_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_projects_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_projects_by_user_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_projects_by_user_id_list (
		user_id BIGINT)
RETURNS SETOF projects AS

$BODY$

SELECT *
FROM projects AS p
WHERE (p.user_id = cp_projects_by_user_id_list.user_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_projects_by_user_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_storage_bins_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_storage_bins_create (
	user_id BIGINT, short_name VARCHAR (60), 
	long_name VARCHAR (120), description VARCHAR (255), location VARCHAR (80), 
	max_column INT, max_row INT)
RETURNS SETOF storage_bins AS

$BODY$

INSERT INTO storage_bins AS s (
	user_id,
	short_name,
	long_name,
	description,
	location,
	max_column,
	max_row)
VALUES (
	cp_storage_bins_create.user_id,
	cp_storage_bins_create.short_name,
	cp_storage_bins_create.long_name,
	cp_storage_bins_create.description,
	cp_storage_bins_create.location,
	cp_storage_bins_create.max_column,
	cp_storage_bins_create.max_row)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_storage_bins_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_storage_bins_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_storage_bins_update (
	storage_bin_id BIGINT, user_id BIGINT, short_name VARCHAR (60), 
	long_name VARCHAR (120), description VARCHAR (255), location VARCHAR (80), 
	max_column INT, max_row INT)
RETURNS SETOF storage_bins AS

$BODY$

UPDATE storage_bins AS s SET
	user_id = cp_storage_bins_update.user_id,
	short_name = cp_storage_bins_update.short_name,
	long_name = cp_storage_bins_update.long_name,
	description = cp_storage_bins_update.description,
	location = cp_storage_bins_update.location,
	max_column = cp_storage_bins_update.max_column,
	max_row = cp_storage_bins_update.max_row
WHERE (s.storage_bin_id = cp_storage_bins_update.storage_bin_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_storage_bins_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_storage_bins_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_storage_bins_delete (
	storage_bin_id BIGINT)
RETURNS SETOF storage_bins AS

$BODY$

DELETE FROM storage_bins AS s
WHERE (s.storage_bin_id = cp_storage_bins_delete.storage_bin_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_storage_bins_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_storage_bins_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_storage_bins_read (
	storage_bin_id BIGINT)
RETURNS SETOF storage_bins AS

$BODY$

SELECT *
FROM storage_bins AS s
WHERE (s.storage_bin_id = cp_storage_bins_read.storage_bin_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_storage_bins_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_storage_bins_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_storage_bins_exists (
	storage_bin_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM storage_bins AS s
WHERE (s.storage_bin_id = cp_storage_bins_exists.storage_bin_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_storage_bins_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_storage_bins_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_storage_bins_list ()
RETURNS SETOF storage_bins AS

$BODY$

SELECT *
FROM storage_bins AS s
ORDER BY s.short_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_storage_bins_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_storage_bins_by_user_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_storage_bins_by_user_id_list (
		user_id BIGINT)
RETURNS SETOF storage_bins AS

$BODY$

SELECT *
FROM storage_bins AS s
WHERE (s.user_id = cp_storage_bins_by_user_id_list.user_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_storage_bins_by_user_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_suppliers_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_suppliers_create (
	supplier_name VARCHAR (60), base_url VARCHAR (255))
RETURNS SETOF suppliers AS

$BODY$

INSERT INTO suppliers AS s (
	supplier_name,
	base_url)
VALUES (
	cp_suppliers_create.supplier_name,
	cp_suppliers_create.base_url)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_suppliers_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_suppliers_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_suppliers_update (
	supplier_id BIGINT, supplier_name VARCHAR (60), base_url VARCHAR (255))
RETURNS SETOF suppliers AS

$BODY$

UPDATE suppliers AS s SET
	supplier_name = cp_suppliers_update.supplier_name,
	base_url = cp_suppliers_update.base_url
WHERE (s.supplier_id = cp_suppliers_update.supplier_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_suppliers_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_suppliers_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_suppliers_delete (
	supplier_id BIGINT)
RETURNS SETOF suppliers AS

$BODY$

DELETE FROM suppliers AS s
WHERE (s.supplier_id = cp_suppliers_delete.supplier_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_suppliers_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_suppliers_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_suppliers_read (
	supplier_id BIGINT)
RETURNS SETOF suppliers AS

$BODY$

SELECT *
FROM suppliers AS s
WHERE (s.supplier_id = cp_suppliers_read.supplier_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_suppliers_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_suppliers_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_suppliers_exists (
	supplier_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM suppliers AS s
WHERE (s.supplier_id = cp_suppliers_exists.supplier_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_suppliers_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_suppliers_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_suppliers_list ()
RETURNS SETOF suppliers AS

$BODY$

SELECT *
FROM suppliers AS s
ORDER BY s.supplier_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_suppliers_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_user_parts_create (
	user_id BIGINT, part_id BIGINT, 
	storage_bins_id BIGINT, columnNumber INT, rowNumber INT, 
	quantity INT)
RETURNS SETOF user_parts AS

$BODY$

INSERT INTO user_parts AS u (
	user_id,
	part_id,
	storage_bins_id,
	columnNumber,
	rowNumber,
	quantity)
VALUES (
	cp_user_parts_create.user_id,
	cp_user_parts_create.part_id,
	cp_user_parts_create.storage_bins_id,
	cp_user_parts_create.columnNumber,
	cp_user_parts_create.rowNumber,
	cp_user_parts_create.quantity)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_user_parts_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_user_parts_update (
	user_part_id BIGINT, user_id BIGINT, part_id BIGINT, 
	storage_bins_id BIGINT, columnNumber INT, rowNumber INT, 
	quantity INT)
RETURNS SETOF user_parts AS

$BODY$

UPDATE user_parts AS u SET
	user_id = cp_user_parts_update.user_id,
	part_id = cp_user_parts_update.part_id,
	storage_bins_id = cp_user_parts_update.storage_bins_id,
	columnNumber = cp_user_parts_update.columnNumber,
	rowNumber = cp_user_parts_update.rowNumber,
	quantity = cp_user_parts_update.quantity
WHERE (u.user_part_id = cp_user_parts_update.user_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_user_parts_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_user_parts_delete (
	user_part_id BIGINT)
RETURNS SETOF user_parts AS

$BODY$

DELETE FROM user_parts AS u
WHERE (u.user_part_id = cp_user_parts_delete.user_part_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_user_parts_read (
	user_part_id BIGINT)
RETURNS SETOF user_parts AS

$BODY$

SELECT *
FROM user_parts AS u
WHERE (u.user_part_id = cp_user_parts_read.user_part_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_user_parts_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_user_parts_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_user_parts_exists (
	user_part_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM user_parts AS u
WHERE (u.user_part_id = cp_user_parts_exists.user_part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_user_parts_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_user_parts_list ()
RETURNS SETOF user_parts AS

$BODY$

SELECT *
FROM user_parts AS u;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_by_part_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_user_parts_by_part_id_list (
		part_id BIGINT)
RETURNS SETOF user_parts AS

$BODY$

SELECT *
FROM user_parts AS u
WHERE (u.part_id = cp_user_parts_by_part_id_list.part_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_by_part_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_by_storage_bins_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_user_parts_by_storage_bins_id_list (
		storage_bin_id BIGINT)
RETURNS SETOF user_parts AS

$BODY$

SELECT *
FROM user_parts AS u
WHERE (u.storage_bins_id = cp_user_parts_by_storage_bins_id_list.storage_bin_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_by_storage_bins_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_user_parts_by_user_id_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		A query based on the foreign key relationships. This will bring back
		all records that match the foreign key.
	
	Returns:
		Returns all the records from the table which match the foreign key.
*/

CREATE FUNCTION cp_user_parts_by_user_id_list (
		user_id BIGINT)
RETURNS SETOF user_parts AS

$BODY$

SELECT *
FROM user_parts AS u
WHERE (u.user_id = cp_user_parts_by_user_id_list.user_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_user_parts_by_user_id_list TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_users_create;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Inserts a new record into the table.
	
	Returns:
		Unique ID of the record inserted.
*/

CREATE FUNCTION cp_users_create (
	user_name VARCHAR (24), email VARCHAR (60), 
	mouser_api_key_orders VARCHAR (128), mouser_api_key_search VARCHAR (128))
RETURNS SETOF users AS

$BODY$

INSERT INTO users AS u (
	user_name,
	email,
	mouser_api_key_orders,
	mouser_api_key_search)
VALUES (
	cp_users_create.user_name,
	cp_users_create.email,
	cp_users_create.mouser_api_key_orders,
	cp_users_create.mouser_api_key_search)
RETURNING *;

$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_users_create TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_users_update;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Updates a record in the table using the primary key.
	
	Returns:
		The complete updated record from the database.
*/

CREATE FUNCTION cp_users_update (
	user_id BIGINT, user_name VARCHAR (24), email VARCHAR (60), 
	mouser_api_key_orders VARCHAR (128), mouser_api_key_search VARCHAR (128))
RETURNS SETOF users AS

$BODY$

UPDATE users AS u SET
	user_name = cp_users_update.user_name,
	email = cp_users_update.email,
	mouser_api_key_orders = cp_users_update.mouser_api_key_orders,
	mouser_api_key_search = cp_users_update.mouser_api_key_search
WHERE (u.user_id = cp_users_update.user_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_users_update TO vintage_parts_role;

DROP FUNCTION IF EXISTS cp_users_delete;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Deletes a record from the table using the primary key.

	Returns:
		The record prior to it's deletion or an empty set if it didn't exist.
*/

CREATE FUNCTION cp_users_delete (
	user_id BIGINT)
RETURNS SETOF users AS

$BODY$

DELETE FROM users AS u
WHERE (u.user_id = cp_users_delete.user_id)
RETURNING *;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_users_delete TO vintage_parts_role;


DROP FUNCTION IF EXISTS cp_users_read;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Returns a single record from the table.
	
	Returns:
		A single complete record if it exists.
*/

CREATE FUNCTION cp_users_read (
	user_id BIGINT)
RETURNS SETOF users AS

$BODY$

SELECT *
FROM users AS u
WHERE (u.user_id = cp_users_read.user_id);


$BODY$
LANGUAGE SQL;


GRANT EXECUTE ON FUNCTION cp_users_read TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_users_exists;

/*
	Auto generated: (18/03/2026 6:03:52 PM)
	
	Description:
		Determines if a record exists which matches a foreign key passed
		in the parameters.
	
	Returns:
		boolean - true if it exists, false otherwise.
*/

CREATE FUNCTION cp_users_exists (
	user_id BIGINT)
RETURNS BOOL AS

$BODY$

SELECT COUNT (*) > 0
FROM users AS u
WHERE (u.user_id = cp_users_exists.user_id);

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_users_exists TO vintage_parts_role;



DROP FUNCTION IF EXISTS cp_users_list;

/*
	Auto generated: (18/03/2026 6:03:52 PM)

	Description:
		Return a list of every record in the table. This can be very long and the
		list isn't paginated. Use at your discretion.

	Returns:
		Returns all the records from the table.
		The set is sorted by the first character based field.
*/

CREATE FUNCTION cp_users_list ()
RETURNS SETOF users AS

$BODY$

SELECT *
FROM users AS u
ORDER BY u.user_name;

$BODY$
LANGUAGE SQL;

GRANT EXECUTE ON FUNCTION cp_users_list TO vintage_parts_role;

