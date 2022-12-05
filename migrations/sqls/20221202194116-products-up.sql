CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name varchar(80),
                          price integer
);
INSERT INTO products (name, price) VALUES ('cake', 58);
INSERT INTO products (name, price) VALUES ('ipod', 500);