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

// app.post("/createAccount", async (req, res) => {
//   let pass = await encryptPass(req.body.password);
//   let username = req.body.username;
//   let id = req.body.id;

//   let user = {
//     id: id,
//     username: username,
//     password: pass,
//     admin: "false",
//   };

//   console.log("Username: " + username);
//   console.log("Password: " + pass);

//   users.push(user);

//   res.status(201).send();
// });

// app.post("/login", async (req, res) => {
//   let inputname = req.body.username;
//   let password = req.body.password;

//   console.log(users);
//   let user = users.find((user) => user.username === inputname);

//   if (user === undefined) {
//     res.status(400).send(
//       JSON.stringify({
//         Result: "Unsuccessful",
//       })
//     );
//     return;
//   }

//   const match = await bcrypt.compare(password, user.password);
//   if (match) {
//     res.status(200).send(
//       JSON.stringify({
//         Result: "Success",
//         id: user.id,
//         username: user.username,
//         admin: user.admin,
//       })
//     );
//     return;
//   } else {
//     res.status(400).send(
//       JSON.stringify({
//         Result: "Unsuccessful",
//       })
//     );
//   }
// });

// //General Functions

// async function encryptPass(password) {
//   let salt = "";
//   let hash = "";

//   try {
//     salt = await bcrypt.genSalt(saltRounds);
//     hash = await bcrypt.hash(password, salt);
//   } catch {
//     console.log("Error Encrypting Pass");
//   }

//   return hash;
// }

// async function adminUsers() {
//   try {
//     users.push({
//       id: "12345678",
//       username: "Callan",
//       password: await encryptPass("Password"),
//       admin: "true",
//     });
//     users.push({
//       id: "87654321",
//       username: "Ashley",
//       password: await encryptPass("Password"),
//       admin: "true",
//     });
//   } catch {
//     console.log("Error Adding Admin Users");
//   }
// }

// //Adding Admin Users
// adminUsers();

//starting server
app.listen(process.env.PORT || 3000, console.log(`listening on port ${PORT}`));
