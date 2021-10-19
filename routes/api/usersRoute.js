const { response } = require("express");
const express = require("express");
const router = express.Router();

//user Model
const Users = require("../../src/model/UserSchema");

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Create account
router.post("/", async(req, res) => {
    console.log("req.body: " + JSON.stringify(req.body));

    const newUser = new Users({
        //id: req.body.id,
        name: req.body.username,
        password: await encryptPass(req.body.password),
        isAdmin: false,
    });
    console.log(newUser);

    try {
        const user = await newUser.save(); //save new usere to the db
        if (!user) {
            throw Error("Something went wrong while saving new user");
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send({ msg: err });
    }
});

//login
// router.post("/login", async (req, res) => {
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

//compare passwords when logging in
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