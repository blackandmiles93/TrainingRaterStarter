const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Borld");
});

module.exports = app;
