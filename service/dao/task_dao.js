const Sequelize = require('sequelize');
const {connection} = require('./connection');

const taskDao = connection.define('task', {
  creatorId: {
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  boardListId: {
    type: Sequelize.INTEGER,
  },
  createdTime : {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = {
  taskDao
};