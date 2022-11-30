const Officers = require("../Controllers/officersController");

const express = require("express");
const officerRouter = express.Router();

officerRouter.route("/").post(Officers.addOfficer).get(Officers.getOfficers);

officerRouter
  .route("/:id")
  .patch(Officers.updateOfficer)
  .delete(Officers.deleteOfficer);

module.exports = officerRouter;
