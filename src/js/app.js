//server code

console.log("APP");
const http = require("http");

const express = require("express");
const app = express();

const bodyParser = require("body-parser"); // middleware

//ROUTES

// Route to Homepage
app.get("/", (req, res) => {
  console.log("we are on the index");
  //res.sendFile(__dirname + "/html/index.html");
  res.send("index page");
});

app.get("/login", (req, res) => {
  console.log("we are on the login ");
  res.send("login");
});

//create server
const server = http.createServer(app).listen(3000);
