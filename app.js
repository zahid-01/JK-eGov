const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./Routers/userRouter");
const viewsRouter = require("./Routers/viewsRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewsRouter);
app.use("/egov/api/user", userRouter);

module.exports = app;
