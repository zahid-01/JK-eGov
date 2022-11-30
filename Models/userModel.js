const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Specify a name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: [true, "Please provide an email"],
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  mobile: {
    type: Number,
    maxlength: 10,
    minlength: 10,
  },
  designation: {
    type: String,
    enum: ["admin", "assistant"],
  },
  homeDistrict: String,
  department: {
    type: String,
    enum: ["Adminstration", "Finance"],
  },
  postingLocation: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Enter a password"],
  },
});

userSchema.pre("save", async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.checkPassword = async function (enteredPw, password) {
  return await bcrypt.compare(enteredPw, password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
