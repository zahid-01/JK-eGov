module.exports = class siteError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${String(statusCode)[0] === "4" ? "Fail" : "error"}`;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
};
