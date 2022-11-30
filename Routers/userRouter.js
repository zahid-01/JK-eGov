const User = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const express = require("express");
const userRouter = express.Router();

userRouter.route("/").post(User.addOfficer).get(User.getOfficers);

userRouter.route("/:id").patch(User.updateOfficer).delete(User.deleteOfficer);

userRouter.post("/sign-up", authController.signUp);
userRouter.get("/sign-in", authController.signIn);

module.exports = userRouter;
