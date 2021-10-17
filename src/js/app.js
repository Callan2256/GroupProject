//server code

console.log("APP");
const http = require("http");

const express = require("express");
const app = express();

const bodyParser = require("body-parser"); // middleware

//ROUTES

const path = require("path");

// Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});

app.get("/login", (req, res) => {
  //res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});

//create server
const server = http.createServer(app).listen(3000);
