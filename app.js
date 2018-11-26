const express = require("express");
require("./config/config");
require("./global_functions");
const models = require("./models");
const sessions = require("./controllers/SessionsController");
const users = require("./controllers/UsersController");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to handle cors
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Borld");
});

// connects application to database
models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch(err => {
    console.log("a problem has occured:", err);
  });

if (CONFIG.app === "dev") {
  models.sequelize.sync();
}

//sessions
app.get("/sessions", sessions.getAll);
app.get("/sessions/:sessionId", sessions.get);
app.post("/sessions", sessions.create);
app.post("/sessions", sessions.update);
//users
app.get("/users", users.getAll);
app.get("/users/:userId", users.get);
app.post("/users", users.create);
app.post("/users", users.update);

module.exports = app;
