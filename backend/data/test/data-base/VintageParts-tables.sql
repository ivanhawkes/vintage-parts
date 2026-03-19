--
-- manufacturers
--

CREATE TABLE manufacturers
(
	manufacturer_id BIGINT IDENTITY (1, 1) NOT NULL,
	manufacturer_name VARCHAR (60) NOT NULL,
	description VARCHAR (255) NULL,
	manufacturer_url VARCHAR (255) NULL,
	aliases VARCHAR (255) NULL
)


--
-- order_parts
--

CREATE TABLE order_parts
(
	order_part_id BIGINT IDENTITY (1, 1) NOT NULL,
	order_id BIGINT NOT NULL,
	part_id BIGINT NOT NULL,
	quantity INT NOT NULL,
	unit_price REAL NOT NULL,
	supplier_part_number VARCHAR (32) NOT NULL,
	manufacturer_part_number VARCHAR (32) NOT NULL,
	manufacturer_name VARCHAR (60) NOT NULL,
	description VARCHAR (255) NULL
)


--
-- orders
--

CREATE TABLE orders
(
	order_id BIGINT IDENTITY (1, 1) NOT NULL,
	user_id BIGINT NOT NULL,
	supplier_id BIGINT NOT NULL,
	order_date DATE NOT NULL,
	order_number VARCHAR (24) NOT NULL,
	currency_code CHAR (3) NOT NULL,
	status SMALLINT NOT NULL
)


--
-- part_types
--

CREATE TABLE part_types
(
	part_type_id BIGINT IDENTITY (1, 1) NOT NULL,
	parent_id INT NOT NULL,
	short_name VARCHAR (60) NOT NULL,
	long_name VARCHAR (120) NOT NULL,
	mouser_url VARCHAR (255) NOT NULL
)


--
-- parts
--

CREATE TABLE parts
(
	part_id BIGINT IDENTITY (1, 1) NOT NULL,
	part_type_id BIGINT NULL,
	part_number VARCHAR (32) NOT NULL,
	series VARCHAR (32) NULL,
	description VARCHAR (255) NULL,
	manufacturer_id BIGINT NOT NULL,
	product_url VARCHAR (255) NULL,
	image_url VARCHAR (255) NULL,
	datasheet_url VARCHAR (255) NULL
)


--
-- project_parts
--

CREATE TABLE project_parts
(
	project_part_id BIGINT IDENTITY (1, 1) NOT NULL,
	project_id BIGINT NOT NULL,
	part_id BIGINT NOT NULL,
	quantity INT NOT NULL
)


--
-- projects
--

CREATE TABLE projects
(
	project_id BIGINT IDENTITY (1, 1) NOT NULL,
	user_id BIGINT NOT NULL,
	project_name VARCHAR (60) NOT NULL,
	description VARCHAR (255) NOT NULL,
	notes TEXT NULL
)


--
-- storage_bins
--

CREATE TABLE storage_bins
(
	storage_bin_id BIGINT IDENTITY (1, 1) NOT NULL,
	user_id BIGINT NOT NULL,
	short_name VARCHAR (60) NOT NULL,
	long_name VARCHAR (120) NOT NULL,
	description VARCHAR (255) NULL,
	location VARCHAR (80) NULL,
	max_column INT NULL,
	max_row INT NULL
)


--
-- suppliers
--

CREATE TABLE suppliers
(
	supplier_id BIGINT IDENTITY (1, 1) NOT NULL,
	supplier_name VARCHAR (60) NOT NULL,
	base_url VARCHAR (255) NOT NULL
)


--
-- user_parts
--

CREATE TABLE user_parts
(
	user_part_id BIGINT IDENTITY (1, 1) NOT NULL,
	user_id BIGINT NOT NULL,
	part_id BIGINT NOT NULL,
	storage_bins_id BIGINT NOT NULL,
	columnNumber INT NOT NULL,
	rowNumber INT NOT NULL,
	quantity INT NOT NULL
)


--
-- users
--

CREATE TABLE users
(
	user_id BIGINT IDENTITY (1, 1) NOT NULL,
	user_name VARCHAR (24) NOT NULL,
	email VARCHAR (60) NOT NULL,
	mouser_api_key_orders VARCHAR (128) NULL,
	mouser_api_key_search VARCHAR (128) NULL
)


