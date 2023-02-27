const { Router } = require('express');
const { check } = require('express-validator');
const {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRapair,
} = require('../controllers/repairs.controllers');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validRepairById } = require('../middlewares/repairs.middlewares');
const { validateFiled } = require('../middlewares/validFiled.middleware');

const router = Router();

router.get('/', findRepairs);

router.get('/:id', validRepairById, findRepair);

router.post(
  '/',
  [
    check('date', 'the date must be mandatory').isDate(),
    check('motorsNumber', 'the motorsNumber must be mandatory').not().isEmpty(),
    check('description', 'the description must be mandatory').not().isEmpty(),
  ],
  validateFiled,
  createRepair
);

router.patch('/:id', validRepairById, protectAccountOwner, updateRepair);

router.delete('/:id', validRepairById, protect, deleteRapair);

module.exports = {
  repairsRouter: router,
};
