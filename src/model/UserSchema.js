//schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new Schema({
  name: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean },
});

module.exports = mongoose.model("Users", UserSchema);
