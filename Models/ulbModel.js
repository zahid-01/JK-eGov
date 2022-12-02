const mongoose = require("mongoose");

const ulbSchema = new mongoose.Schema({
  ulbName: {
    type: String,
    required: [true, "Provide a name for the ULB"],
  },
  ulbCode: {
    type: String,
    required: [true, "Provide a the code of ULB"],
  },
  district: {
    type: String,
    required: [true, "Provide the district"],
  },
  noOfWards: {
    type: Number,
    required: [true, "Provide the number of wards"],
  },
  noOfHouseHolds: {
    type: Number,
    required: [true, "Provide number of house holds"],
  },
  population: {
    type: Number,
    required: [true, "Provide the population of ULB"],
  },
  visitingOfficer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const ULB = mongoose.model("ULB", ulbSchema);

module.exports = ULB;
