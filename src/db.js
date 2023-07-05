const { Client } = require("pg");
const client = new Client({
  database: "postgres",
});

module.exports = client;
