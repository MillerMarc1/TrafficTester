const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./orcldb");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/get", (req, res) => {
  const query = req.query.query;
  connection.req(query).then((response) => {
    res.send(response);
    console.log(response);
  });
});

app.post("/addUser", (req, res) => {
  console.log(req.body.user);
  const sqlCode = `INSERT INTO DVULOPAS.USERSTEST (firstName, lastName, email, username, password) VALUES (${req.body.user})`;
  console.log(sqlCode);
  connection.req(sqlCode).then((response) => {
    res.send("user added");
    console.log(response);
  });
});

app.get("/getUser", (req, res) => {
  console.log(req.query.username);
  const query = `SELECT PASSWORD FROM DVULOPAS.USERSTEST WHERE USERNAME = '${req.query.username}'`;

  connection.req(query).then((response) => {
    res.send(response);
    console.log(response);
  });
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
