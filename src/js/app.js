//server code

const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const bodyParser = require("body-parser");

//create express app
const app = express();
const PORT = 3000;
const path = require("path");

//connect to database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//ROUTES
//Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});
app.use(express.static(path.join(__dirname, "..", "css")));

//starting server
app.listen(3000, console.log(`listening on port ${PORT}`));
