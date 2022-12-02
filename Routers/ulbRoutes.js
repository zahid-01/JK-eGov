const express = require("express");
const ulbRouter = express.Router();

const ulbCntrlr = require("../Controllers/ulbController");

ulbRouter.route("/:id").patch(ulbCntrlr.updateUlb).delete(ulbCntrlr.deleteUlb);
ulbRouter.route("/").post(ulbCntrlr.addUlb).get(ulbCntrlr.getAllUlb);

module.exports = ulbRouter;
