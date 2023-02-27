const Repairs = require('../models/repairs.model');
const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: Users,
        where: { status: 'available' },
      },
    ],
  });
  res.status(200).json({
    status: 'Success',
    message: 'The repairs found successfully ',
    repairs,
  });

  if (!repairs) {
    return next(new AppError('repairs not found', 404));
  }
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  res.status(200).json({
    status: 'Success',
    message: 'The repair was found successfully',
    repair,
  });
  if (!repair) {
    return next(new AppError('repair not found', 404));
  }
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, userId, motorsNumber, description } = req.body;

  const newRepair = await Repairs.create({
    date,
    motorsNumber,
    description,
    userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'The repair was created successfully',
    newRepair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const { status } = req.body;

  const updateRepair = await repair.update({
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The repair has been updatred successfully',
    updateRepair,
  });
});

exports.deleteRapair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });
});
