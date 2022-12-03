const siteError = require("../Error/siteError");

const catchDbError = (err) => {
  const message = `Invalid ${err.path}, ${err.value}`;
  return new siteError(400, message);
};

//Duplicate errors
const catchDuplicateKey = (err) => {
  const message = `${err.code}: Duplicate key: ${err.message.match(/(["'])(\\?.)*?\1/)[0]}`;
  return new siteError(400, message);
};

//Validation errors
const validationErrors = (err) => {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  // console.log(message);
  return new siteError(500, message);
};

//Invalid token
const handleInvalidToken = () => new siteError(401, "Invalid token, Login again");

//Expired token
const handleTokenExpired = () => new siteError(401, "Session expired, Login again");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (error.name === "CastError") {
    error = catchDbError(error);
  }
  if (error.code === 11000) {
    error = catchDuplicateKey(err);
  }
  //Validation errors
  if (err.name === "ValidationError") {
    error = validationErrors(err);
  }
  if (err.name === "JsonWebTokenError") {
    error = handleInvalidToken();
  }
  if (err.name === "TokenExpiredError") {
    error = handleTokenExpired();
  }

  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: "FAIL!",
      message: err.message,
    });
  }

  return res.status(error.statusCode).render("error", {
    title: "Something went wrong",
    msg: "Please try again",
  });
};
