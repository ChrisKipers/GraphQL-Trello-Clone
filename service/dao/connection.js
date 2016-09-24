const Sequelize = require('sequelize');
const config = require('../config');

const connection =
  new Sequelize(
    config.MYSQL_DB, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
      host: config.MYSQL_HOST,
      dialect: config.MYSQL_DIALECT
    });

module.exports = {
  connection
};