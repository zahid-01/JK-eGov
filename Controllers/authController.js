const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const createToken = (id) => {
  return jwt.sign(id, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res) => {
  const officer = await User.create({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    homeDistrict: req.body.homeDistrict,
    department: req.body.department,
    password: req.body.password,
  });

  const token = createToken({ id: officer._id });

  res.cookie("jwt", token);

  res.status(200).json({
    status: "Success",
    data: {
      token,
    },
  });
};

exports.signIn = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "Enter your credentials" });

  const user = await User.findOne({ email: req.body.email });
  const check = await user?.checkPassword(req.body.password, user.password);

  if (!user || !check) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = createToken({ id: user._id });

  res.status(200).json({
    status: "Success",
    message: "Logged in successfully",
    data: {
      token,
    },
  });
};
