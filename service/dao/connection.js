var Sequelize = require('sequelize');

const connection = new Sequelize('mysql://localhost:3306/trelloclone', {});

module.exports = {
  connection
};