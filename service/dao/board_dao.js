const Sequelize = require('sequelize');
const {connection} = require('./connection');

const boardDao = connection.define('board', {
  creatorId: {
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdTime : {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = {
  boardDao
};