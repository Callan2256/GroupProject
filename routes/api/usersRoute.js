// handles the user form data

const { response } = require("express");
const express = require("express");
const router = express.Router();

//user Model
const Users = require("../../src/model/UserSchema");

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//
let users = new Array();

//@routes GET api/users
//@desc get users
router.get("/", async (req, res) => {
  try {
    const user = await Users.find();
    if (!user) {
      throw Error("No users");
    }
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//Create account
router.post("/", async (req, res) => {
  console.log("req.body: " + JSON.stringify(req.body));

  const newUser = new Users({
    //id: req.body.id,
    name: req.body.username,
    password: await encryptPass(req.body.password),
    isAdmin: true,
  });
  console.log(newUser);

  try {
    const user = await newUser.save(); //save new user to the db
    if (!user) {
      throw Error("Something went wrong while saving new user");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//login
router.post("/login", async (req, res) => {
  console.log("login");
  console.log("req.body: " + req.body);

  try {
    const user = await Users.findOne({
      name: req.body.username,
    });
    if (!user) {
      throw Error("user not found");
    }
    res.status(200).json(user);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      res.status(200).send(
        JSON.stringify({
          Result: "Success",
          // id: user.id,
          username: user.username,
          admin: user.admin,
        })
      );

      return;
    } else {
      res.status(400).send(
        JSON.stringify({
          Result: "Unsuccessful",
        })
      );
    }

    console.log(user);
  } catch (err) {
    res.status(400).send({ msg: err });
  }

  //compare passwords when logging in
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.status(200).send(
      JSON.stringify({
        Result: "Success",
        id: user.id,
        username: user.username,
        admin: user.admin,
      })
    );
    return;
  } else {
    res.status(400).send(
      JSON.stringify({
        Result: "Unsuccessful",
      })
    );
  }
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

module.exports = router;
