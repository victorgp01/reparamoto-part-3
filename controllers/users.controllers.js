const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The users found successfully ',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    message: 'The user was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await Users.create({
    name,
    email,
    password,
    role,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  const updateUser = await user.update({
    name,
    email,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The user has been updatred successfully',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });
});
