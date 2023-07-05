CREATE DATABASE libraryApp;

CREATE TABLE books(
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  description VARCHAR(255)
);