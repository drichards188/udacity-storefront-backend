CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        userid integer REFERENCES users(id),
                        status varchar(80)
);
INSERT INTO orders (userid, status) VALUES (1, 'active');
