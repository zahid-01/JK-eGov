const visitingOfficers = require("../Models/visitingOfficers");

exports.addOfficer = async (req, res) => {
  const officer = await visitingOfficers.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      data: officer,
    },
  });
};

exports.updateOfficer = async (req, res) => {
  const updatedOfficer = await visitingOfficers.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(202).json({
    status: "Success",
    data: {
      updatedData: updatedOfficer,
    },
  });
};

exports.deleteOfficer = async (req, res) => {
  await visitingOfficers.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    data: null,
  });
};

exports.getOfficers = async (req, res) => {
  const officers = await visitingOfficers.find();

  res.status(200).json({
    status: "Success",
    officers: officers.length,
    data: {
      data: officers,
    },
  });
};
