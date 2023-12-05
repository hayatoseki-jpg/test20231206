//module import
const { Client } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

const client = new Client({
  user: "postgres",
  host: "10.224.128.12",
  database: "guestbook",
  password: "postgres",
  port: 5432,
});

// client.host = process.env.ALLOYDB_IP;

// Init
const app = express();
client.connect();
// let result;

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

//read
app.get("/", (req, res) => {
  const read_query = {
    text: "SELECT * FROM entries;",
  };

  client
    .query(read_query)
    .then((result) => {
      console.log(result.rows);
      res.json(result.rows);
    })
    .catch((e) => {
      console.error(e.stack);
      res.send("NG");
      // process.exit(1);
    });
});

//write
app.post("/write", (req, res) => {
  const write_query = {
    text: `INSERT INTO entries (guestName, content) values ('${req.body.guestname}', '${req.body.content}');`,
  };

  client
    .query(write_query)
    .then((result) => {
      console.log(req.body);
      res.json("OK");
    })
    .catch((e) => {
      console.error(e.stack);
      res.send("NG");
      // process.exit(1);
    });
});
