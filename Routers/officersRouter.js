const Officers = require("../Controllers/officersController");
const authController = require("../Controllers/authController");

const express = require("express");
const officerRouter = express.Router();

officerRouter.route("/").post(Officers.addOfficer).get(Officers.getOfficers);

officerRouter
  .route("/:id")
  .patch(Officers.updateOfficer)
  .delete(Officers.deleteOfficer);

officerRouter.post("/sign-up", authController.signUp);

module.exports = officerRouter;
