CREATE TABLE order_products (
                                id SERIAL PRIMARY KEY,
                                orderid integer REFERENCES orders(id),
                                productid integer REFERENCES products(id),
                                quantity integer
);

INSERT INTO order_products (orderid, productid, quantity) VALUES (1, 1, 3);
INSERT INTO order_products (orderid, productid, quantity) VALUES (1, 2, 4);