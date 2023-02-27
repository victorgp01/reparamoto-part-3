const Repairs = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return next(new AppError('The repair was not found', 404));
  }

  req.repair = repair;
  next();
});
