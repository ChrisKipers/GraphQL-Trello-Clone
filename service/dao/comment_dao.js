const Sequelize = require('sequelize');
const {connection} = require('./connection');

const commentDao = connection.define('comment', {
  creatorId: {
    type: Sequelize.INTEGER
  },
  content: Sequelize.STRING,
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
  commentDao
};