const Repairs = require('./repairs.model');
const Users = require('./users.model');

const initModel = () => {
  Users.hasMany(Repairs);
  Repairs.belongsTo(Users);
};

module.exports = initModel;
