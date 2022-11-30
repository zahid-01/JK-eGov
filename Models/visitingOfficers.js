const mongoose = require("mongoose");
const validator = require("validator");

const visitingOfficers = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Specify a name"],
  },
  mobile: {
    type: Number,
    required: [true, "Phone number is mandatory"],
    unique: [true, "Phone number already exists"],
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: [true, "Please provide an email"],
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  designation: {
    type: String,
    required: [true, "Enter your designation"],
    enum: ["admin", "assistant"],
  },
  homeDistrict: {
    type: String,
    required: [true, "Please provide your home district"],
  },
  department: {
    type: String,
    required: [true, "Please provide your department"],
    enum: ["Adminstration", "Finance"],
  },
  postingLocation: {
    type: String,
    required: [true, "Provide posting details"],
  },
});

const Officers = mongoose.model("OFFICERS", visitingOfficers);
module.exports = Officers;
