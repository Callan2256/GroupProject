//server code
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//create express app
const app = express();
const PORT = 3000;
const path = require("path");

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Temporary array
let users = [];
let products = [];

//ROUTES

//Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "html", "index.html"));
});

//Static path for CSS
app.use(express.static(path.join(__dirname, "..", "/public")));

app.get("/model/user.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "model", "user.js"));
});

app.get("/model/products.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "model", "products.js"));
});

app.get("/controller/controller.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "controller", "controller.js"));
});

app.get("/users", (req, res) => {
  res.send(users);
});

//addproduct form
app.get("/addproduct", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "view", "html", "addProductForm.html")
  );
});

//create product in form
const productRoutes = require("../../routes/api/productsRoute");
app.use("/api/products", productRoutes);

//get products
app.get("/api/products", productRoutes);

//create account in form
const userRoutes = require("../../routes/api/usersRoute");
app.use("/api/users", userRoutes);

//starting server
app.listen(process.env.PORT || PORT, console.log(`listening on port ${PORT}`));
