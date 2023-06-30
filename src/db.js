const { Client } = require("pg");
const client = new Client({
  database: "postgres",
});

client
  .connect()
  .then(() => client.query("SELECT $1::text as message", ["Hello world!"]))
  .then((res) => {
    console.log(res.rows[0].message);
    return client.end();
  });
