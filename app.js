const express = require("express");
const app = express();
const userRouter = require("./Routers/userRouter");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.json());

app.use("/egov/api/user", userRouter);

module.exports = app;
