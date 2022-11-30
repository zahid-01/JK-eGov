const express = require("express");
const app = express();
const officerRouter = require("./Routers/officersRouter");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.json());

app.use("/egov/api/officers", officerRouter);

module.exports = app;
