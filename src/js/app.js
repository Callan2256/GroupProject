//server code
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//create express app
const app = express();
const PORT = 3000;
const path = require("path");

//bcrypt
const bcrypt = require('bcrypt');
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

//ROUTES

const productRoutes = require("../../routes/api/productsRoute");
//create product
app.use("/api/products", productRoutes);

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

app.post('/create', async(req, res) => {
    let pass = await encryptPass(req.body.password);
    let username = req.body.username;

    console.log("Username: " + username);
    console.log("Password: " + pass);

    res.status(201).send();
});

//General Functions

async function encryptPass(password) {
    let salt = "";
    let hash = "";

    try {
        salt = await bcrypt.genSalt(saltRounds);
        hash = await bcrypt.hash(password, salt);
    } catch {
        console.log("Error Encrypting Pass");
    }

    return hash;
}

//starting server
app.listen(3000, console.log(`listening on port ${PORT}`));