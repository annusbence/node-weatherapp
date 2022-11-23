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
  const oldDate = new Date(Date.now() - 10 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlSelect = `SELECT * FROM weatherapp WHERE city = '${city}' and date > '${oldDate}';`
  connection.query(sqlSelect, async (err, rows) => {
    if (err) {
      res.sendStatus(500);
      return;
    };
    if (rows.length === 0) {
      const response = await fetch(url);
      const weatherData = await response.json();
      const icon = weatherData.weather[0].icon;

      const sendData = {
        longitude: weatherData.coord.lon,
        city: weatherData.name,
        latitude: weatherData.coord.lat,
        temp: weatherData.main.temp,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        windpower: weatherData.wind.speed,
        winddirect: weatherData.wind.deg,
        date: newDate,
        cloud: `http://openweathermap.org/img/wn/${icon}@2x.png`
      };

      const sqlUpdate = `UPDATE weatherapp SET ? WHERE city='${city}';`;
      connection.query(sqlUpdate, sendData, (err, rows) => {
        if (err) {
          console.log(err)
          res.sendStatus(500);
          return;
        }
        res.render('index', { sendData: sendData });
      })
    } else {
      res.render('index', { sendData: rows[0] });
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