const mysql = require('mysql');
const dotenv = require("dotenv");
const logger = require('./src/logger');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.log(error);
    logger.info(error)
    return;
  }
  logger.info(`Connection to MySQL is established!`);
});

module.exports = connection;