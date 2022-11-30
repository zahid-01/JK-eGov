const jwt = require("jsonwebtoken");
const Officer = require("../Models/visitingOfficers");

const createToken = (id) => {
  return jwt.sign(id, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res) => {
  // const token = jwt.sign(req.body.password, process.env.SECRET_JWT);
  const officer = await Officer.create({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.phone,
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
