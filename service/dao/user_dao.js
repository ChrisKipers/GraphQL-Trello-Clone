const Sequelize = require('sequelize');
const {connection} = require('./connection');

const userDao = connection.define('user', {
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = {
  userDao
};