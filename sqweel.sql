CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, description) VALUES
('Alice', 'A curious adventurer.'),
('Bob', 'A skilled craftsman.'),
('Charlie', 'A wise scholar.');

SELECT * FROM users;
SELECT COUNT(*) FROM users;
SELECT name FROM users WHERE name LIKE 'A%';
-- select only names and descriptions
SELECT name, description FROM users;
-- select users created after a certain date
SELECT * FROM users WHERE created_at > '2024-01-01';
SELECT * FROM users ORDER BY name DESC;


UPDATE users SET description = 'An experienced explorer.' WHERE name = 'Alice';
UPDATE users SET description = 'A master artisan.' WHERE name = 'Bob';


DELETE FROM users WHERE name = 'Charlie';
