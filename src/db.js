import pg from "pg";
const { Client } = pg;
const client = new Client({
  database: "postgres",
  user: "postgres",
  password: "4y7sV96vA9wv46VR",
  port: 5432,
  host: "localhost",
});

export default client;
