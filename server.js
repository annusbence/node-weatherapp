const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const logger = require('./src/logger');
const dotenv = require("dotenv");
const connection = require("./db.js");

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const sendData = { location: 'Location', coordinates: 'Coordinates', temp: 'Temperature', pressure: 'Air pressure', humidity: 'Humidity', wind: 'Wind', date: 'date', imgURL: 'imgURL' };
  res.render('index', { sendData: sendData });
});

app.post('/', async (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
  const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlSelect = `SELECT * FROM weatherapp WHERE city = '${city}' and date < '${newDate - 1000}';`

  connection.query(sqlSelect, async (err, rows) => {
    if (err) {
      res.sendStatus(500);
      return;
    };
    if (rows) {
      const response = await fetch(url);
      const weatherData = await response.json();
      const location = weatherData.name;
      const longitude = weatherData.coord.lon;
      const latitude = weatherData.coord.lat;
      const temp = weatherData.main.temp;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const windpower = weatherData.wind.speed;
      const winddirect = weatherData.wind.deg;
      const icon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const sendData = {};
      sendData.location = location;
      sendData.longitude = longitude;
      sendData.latitude = latitude;
      sendData.temp = temp;
      sendData.pressure = pressure;
      sendData.humidity = humidity;
      sendData.windpower = windpower;
      sendData.date = newDate;
      sendData.imgURL = imgURL;

      const sqlUpdate = `UPDATE weatherapp SET date='${newDate}',longitude =${longitude},latitude =${latitude},temp=${temp}, pressure=${pressure}, humidity=${humidity}, windpower=${windpower},winddirect =${winddirect}, cloud='${imgURL}' WHERE city='${city}';`;

      connection.query(sqlUpdate), (err, rows) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
      }
      res.render('index', { sendData: sendData });

    } else {
      connection.query(sqlSelect, async (err, rows) => {
        if (err) {
          res.sendStatus(500);
          return;
        } else {
          const dataRows = rows[0];
          const sendData = {};
          sendData.location = dataRows.city;
          sendData.coordinates = dataRows.coordinates;
          sendData.temp = dataRows.temp;
          sendData.pressure = dataRows.pressure;
          sendData.humidity = dataRows.humidity;
          sendData.wind = dataRows.wind;
          sendData.date = dataRows.date;
          sendData.imgURL = dataRows.imgURL;
          res.render('index', { sendData: sendData });
        }
      });
    }
  });
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