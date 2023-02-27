const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Users = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ['client', 'employee'],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
    enum: ['available', 'disabled'],
  },
});

module.exports = Users;
