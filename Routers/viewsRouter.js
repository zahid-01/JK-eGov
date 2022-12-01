const express = require("express");
const viewsRouter = express.Router();
const viewsCntrl = require("../Controllers/viewsController");
const authCntrl = require("../Controllers/authController");

viewsRouter.use(authCntrl.isLoggedIn);
viewsRouter.route("/sign-up").get(viewsCntrl.signUp);
viewsRouter.route("/log-in").get(viewsCntrl.logIn);
viewsRouter.route("/").get(viewsCntrl.home);

module.exports = viewsRouter;
