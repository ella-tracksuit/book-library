CREATE DATABASE libraryApp;

CREATE TABLE books(
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(500),
  author VARCHAR(500),
  description VARCHAR(1000)
);