const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { promisify } = require("util");
const { catchError } = require("../Error/catchError");

const createToken = (id) => {
  return jwt.sign(id, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchError(async (req, res) => {
  const officer = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken({ id: officer._id });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(200).json({
    status: "Success",
    data: {
      token,
    },
  });
});

exports.signIn = catchError(async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "Enter your credentials" });

  const user = await User.findOne({ email: req.body.email });
  const check = await user?.checkPassword(req.body.password, user.password);

  if (!user || !check) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = createToken({ id: user._id });

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "Success",
    token,
    user,
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "You are logged out", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "Success" });
};

exports.isLoggedIn = catchError(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const verify = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRET_JWT);
      const activeUser = await User.findById(verify.id);
      if (!activeUser) return next();

      res.locals.user = activeUser;
      return next();
    }
  } catch (e) {
    return next();
  }
  next();
});

exports.protect = catchError(async (req, res, next) => {
  //1) Getting token and checking if its there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError(401, "You are not logged in"));
  }
  //2) Verification token
  const verify = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3) Check if user still exists
  const activeUser = await User.findById(verify.id);
  if (!activeUser) return next(new AppError(500, "User does not exist"));

  req.user = activeUser;
  res.locals.user = activeUser;
  next();
});
