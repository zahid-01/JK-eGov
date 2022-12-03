const ULB = require("../Models/ulbModel");
const { catchError } = require("../Error/catchError");

exports.addUlb = catchError(async (req, res) => {
  const ulb = await ULB.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      data: ulb,
    },
  });
});

exports.updateUlb = catchError(async (req, res) => {
  const updatedUlb = await ULB.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(202).json({
    status: "Success",
    data: {
      updatedData: updatedUlb,
    },
  });
});

exports.deleteUlb = catchError(async (req, res) => {
  await ULB.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getAllUlb = catchError(async (req, res) => {
  const ulb = await ULB.find().populate({
    path: "visitingOfficer",
    select: "name",
  });

  res.status(200).json({
    status: "Success",
    ulb: ulb.length,
    data: {
      data: ulb,
    },
  });
});
