module.exports = {
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || '',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_DB: process.env.MYSQL_DB || 'trelloclone',
  MYSQL_DIALECT: process.env.MYSQL_DIALECT || 'mysql',
  MYSQL_SOCKET_PATH: process.env.MYSQL_SOCKET_PATH || null,
  PORT: process.env.PORT || 4000
};
