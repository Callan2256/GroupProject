//server code

console.log("APP");
const http = require("http");

const express = require("express");
const app = express();

//ROUTES
app.use("/", (req, res) => {
  res.send("HELLO");
});

//create server
const server = http.createServer(app).listen(3000);
