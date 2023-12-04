const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "10.55.0.2",
  database: "guestbook",
  password: "postgres",
  port: 5432,
});

client.connect();

const query = {
  text: "SELECT * FROM entries;",
};

client
  .query(query)
  .then((res) => {
    console.log(res.rows);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
