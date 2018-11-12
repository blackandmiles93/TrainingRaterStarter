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
    console.log("a problem has occured", err);
  });

if (CONFIG.app === "dev") {
  models.sequelize.sync();
}

//sessions
app.get("/sessions", sessions.getAll);
app.get("/sessions/:sessionId", sessions.get);
//users
app.get("/users", users.getAll);
app.get("/users/:userId", users.get);
app.post("/users", users.create);
app.post("/users", users.update);

module.exports = app;
