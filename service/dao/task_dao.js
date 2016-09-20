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
  position: {
    type: Sequelize.INTEGER
  },
  createdTime : {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM('NEW', 'ASSIGNED', 'IN PROGRESS', 'COMPLETED', 'CLOSED'),
    defaultValue: 'NEW'
  }
});

taskDao.getNumberOfTasksForBoard = function(boardId, options) {
  const query =
    `
      SELECT COUNT(*) FROM tasks AS ts
      INNER JOIN boardLists as bl on ts.boardListId = bl.id
      WHERE bl.boardId = :boardId
    `;
  return connection
    .query(query, {replacements: {boardId: boardId}, type: connection.QueryTypes.SELECT})
    .then(r => r[0]['COUNT(*)'])
};

module.exports = {
  taskDao
};