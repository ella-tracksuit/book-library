const { Client } = require("pg");
const client = new Client({
  database: "postgres",
  user: "postgres",
  password: "4y7sV96vA9wv46VR",
  port: 5432,
  host: "localhost",
});

module.exports = client;
