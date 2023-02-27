const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controllers');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validUserById,
  validIfExistUserEmail,
} = require('../middlewares/users.middlewares');
const { validateFiled } = require('../middlewares/validFiled.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validUserById, findUser);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    validateFiled,
    validUserById,
    validIfExistUserEmail,
    protectAccountOwner,
  ],
  updateUser
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updatePassword
);

router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
