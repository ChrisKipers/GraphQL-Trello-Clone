const Sequelize = require('sequelize');
const {connection} = require('./connection');

const boardListDao = connection.define('boardList', {
  creatorId: {
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  boardId: {
    type: Sequelize.INTEGER
  },
  position: {
    type: Sequelize.INTEGER
  },
  createdTime : {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = {
  boardListDao
};