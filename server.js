const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const logger = require('./src/logger');
const dotenv = require("dotenv");
const connection = require("./db.js");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const sendData = { location: 'Location', coordinates: 'Coordinates', temp: 'Temperature', pressure: 'Air pressure', humidity: 'Humidity', wind: 'Wind', timestamp: 'timestamp', imgURL: 'imgURL' }
  res.render('index', { sendData: sendData });
});

app.post('/', async (req, res) => {
  const city = await req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  const location = weatherData.name;
  const coordinates = weatherData.coord;
  const temp = weatherData.main.temp;
  const pressure = weatherData.main.pressure;
  const humidity = weatherData.main.humidity;
  const wind = weatherData.wind.speed;
  const sendData = {};
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const icon = weatherData.weather[0].icon;
  const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
  sendData.location = location;
  sendData.coordinates = coordinates;
  sendData.temp = temp;
  sendData.pressure = pressure;
  sendData.humidity = humidity;
  sendData.wind = wind;
  sendData.timestamp = timestamp;
  sendData.imgURL = imgURL;
  res.render('index', { sendData: sendData })
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