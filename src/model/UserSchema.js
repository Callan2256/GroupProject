//schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new Schema({
  name: { type: String, require: true },
  password: { type: Number, require: true },
  isAdmin: { type: Boolean },
});

// UserSchema.pre("save", function (next) {
//   console.log("encryption ....");
//   const user = this;

//   if (this.isModified("password") || this.isNew) {
//     //generate salt
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         //hash password
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }
//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });

module.exports = mongoose.model("Users", UserSchema);
