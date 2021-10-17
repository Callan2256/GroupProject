//server code

console.log("APP");
const http = require("http");

const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser"); // middleware

const mongoose = require("mongoose");

//ROUTES
// Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});
app.use(express.static(path.join(__dirname, "..", "css")));

app.get("/login", (req, res) => {
  //res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});

//connect to database
// mongoose.connect("");

//create server
const server = http.createServer(app).listen(3000);
