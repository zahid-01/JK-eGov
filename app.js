const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./Routers/userRouter");
const viewsRouter = require("./Routers/viewsRouter");
const ulbRouter = require("./Routers/ulbRoutes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const errorController = require("./Controllers/errorController");

// app.use(morgan("dev"));
// app.use(bodyparser());
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewsRouter);
app.use("/egov/api/user", userRouter);
app.use("/egov/api/ulb", ulbRouter);

app.use(errorController);

module.exports = app;
