//server code

console.log("APP");
const http = require("http");

const express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");

const app = express();

app.use("/", (req, res) => {
  res.send("we are noton home");
});
//ROUTES

//create server
const server = http.createServer(app).listen(3000);
