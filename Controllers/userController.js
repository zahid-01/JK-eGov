const User = require("../Models/userModel");

exports.addOfficer = async (req, res) => {
  const officer = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      data: officer,
    },
  });
};

exports.updateOfficer = async (req, res) => {
  const updatedOfficer = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(202).json({
    status: "Success",
    data: {
      updatedData: updatedOfficer,
    },
  });
};

exports.deleteOfficer = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    data: null,
  });
};

exports.getOfficers = async (req, res) => {
  const officers = await User.find();

  res.status(200).json({
    status: "Success",
    officers: officers.length,
    data: {
      data: officers,
    },
  });
};
