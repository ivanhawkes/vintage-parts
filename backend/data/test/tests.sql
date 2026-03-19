-- SEQUENCE ERROR AFTER BULK IMPORT
SELECT
    last_value, (SELECT MAX (id) FROM manufacturers) as max_id
FROM manufacturers_id_seq;

SELECT setval('manufacturers_id_seq', max(id)) FROM manufacturers;

SELECT (MAX(id) FROM manufacturers) ;


SELECT * FROM cp_manufacturers_list ();
SELECT * FROM cp_manufacturers_read (1);
SELECT * FROM cp_order_parts_by_order_id_list(1);
SELECT * FROM cp_orders_by_supplier_id_list(1);

-- TEST USERS

SELECT * FROM cp_users_create (
    'Boring Guy',
    'bguy@example.com'
);

SELECT * FROM cp_users_read (1);

SELECT * FROM cp_users_list ();

SELECT * FROM cp_users_exists (2);

SELECT * FROM cp_users_update (
    2,
    'More Boring Guy',
    'morebguy@example.com'
);

SELECT * FROM cp_users_delete(2);


-- TEST MANUFACTURERS

SELECT * FROM cp_manufacturers_create (
    'AAA Widgets Incorporated',
    'A fake company',
    'https://www.example.com',
    'Widgets,Wedges'
);

SELECT * FROM cp_manufacturers_list ();

CALL cp_manufacturers_delete(59);


-- MISCELLANEOUS TESTS

SELECT * FROM cp_order_parts_by_order_id_list(1);
SELECT * FROM cp_orders_by_supplier_id_list(1);
