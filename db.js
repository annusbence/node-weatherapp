const mariadb = require('mariadb');
const dotenv = require("dotenv");

dotenv.config();

const connection = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection((error, connection) => {
  if (error) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection lost');
      logger.error('Database connection lost');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connection');
      logger.error('Database has too many connection');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
      logger.error('Database connection was refused');
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = connection;