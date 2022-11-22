const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const mysql = require('mysql');
const logger = require('./src/logger');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('../public'));
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conn.connect(err => {
  if (err) {
    console.log(err.toString());
    return;
  }
  console.log('Connetion to DB is OK');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/', async (req, res) => {
  let city = await req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  const location = weatherData.name;
  const coordinates = weatherData.coord;
  const temp = weatherData.main.temp;
  const pressure = weatherData.main.pressure;
  const humidity = weatherData.main.humidity;
  const wind = weatherData.wind;
  const clouds = weatherData.clouds;
  console.log(pressure, humidity, wind, clouds);
});

logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');

app.listen(PORT, () => {
  logger.info(`Server is running on Port: ${PORT}`);
});