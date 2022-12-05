const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const compression = require("compression");
const userRouter = require("./Routers/userRouter");
const viewsRouter = require("./Routers/viewsRouter");
const ulbRouter = require("./Routers/ulbRoutes");
const morgan = require("morgan");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const errorController = require("./Controllers/errorController");

// app.use(morgan("dev"));
// app.use(bodyparser());
//Mongo sanitize
app.use(mongoSanitize());

//XSS sanitization
app.use(xss());

//hpp
app.use(hpp());
app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewsRouter);
app.use("/egov/api/user", userRouter);
app.use("/egov/api/ulb", ulbRouter);
app.use(compression());

app.use(errorController);

module.exports = app;
