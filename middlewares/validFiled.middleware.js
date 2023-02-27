const { validationResult } = require('express-validator');

exports.validateFiled = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      error: error.mapped(),
    });
  }

  next();
};
