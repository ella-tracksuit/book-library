import http from "http";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import db from "./db.js";
const server = http.createServer();
await db.connect();

// TODO change to switch statement
server.on("request", async (req, res) => {
  let filePath = path.resolve(__dirname + "/../public" + req.url);

  if (req.url === "/books" && req.method === "GET") {
    // Handle GET request for "/books"
    db.query("SELECT * FROM books")
      .then((result) => {
        res.setHeader("All-Books", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(result.rows));
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error retrieving books" })``);
      });
  } else if (req.url === "/books/add" && req.method === "POST") {
    // Handle POST request for "/books/add"
    let body = "";
    req.on("data", (newBookData) => {
      body += newBookData;
    });
    req.on("end", () => {
      const bookData = JSON.parse(body);
      // Perform db operation to add the book
      db.query(
        "INSERT INTO books (title, author, description) VALUES($1, $2, $3) RETURNING *",
        [bookData.title, bookData.author, bookData.description]
      )
        .then(() => {
          res.statusCode = 201;
          res.end(JSON.stringify({ message: "Book added successfully" }));
        })
        .catch((error) => {
          console.error("Error adding book:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Error adding book" }));
        });
    });
  } else if (req.url.match(/^\/books\/\d+$/) && req.method === "PATCH") {
    // Handle PATCH request for "/books/:id"
    const bookId = req.url.split("/")[2];
    let body = "";
    req.on("data", (updatedBookData) => {
      body += updatedBookData;
    });
    req
      .on("end", () => {
        const bookData = JSON.parse(body);
        // Perform db operation to update the book
        db.query(
          "UPDATE books SET title = $1, author = $3, description = $2 WHERE book_id = $4",
          [bookData.title, bookData.description, bookId]
        );
      })
      .then(() => {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Book updated successfully" }));
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error updating book" }));
      });
  } else if (req.url.match(/^\/books\/\d+$/) && req.method === "PATCH") {
    // Handle DELETE request for "/books/:id"
    const bookId = req.url.split("/")[2];
    db.query("DELETE FROM books WHERE book_id = $1", [bookId])
      .then(() => {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Book deleted successfully" }));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error deleting book" }));
      });
  } else {
    // serve static files
    if (fs.existsSync(filePath)) {
      if (fs.statSync(filePath).isDirectory()) {
        filePath += "/index.html";
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          res.end(data);
        }
      });
    } else {
      res.statusCode = 404;
      res.end(`File ${filePath} not found!`);
    }
  }
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
