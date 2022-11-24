const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('./src/logger');
const dotenv = require("dotenv");
const connection = require("./db");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
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
  try {
    const sqlSelect = `SELECT * FROM weatherapp WHERE city = '${city}' and date > '${oldDate}';`
    const rows = await connection.query(sqlSelect);
    if (rows.length === 0) {
      const response = await fetch(url);
      const weatherData = await response.json();
      const icon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const temp = Math.round(weatherData.main.temp);
      const wind = Math.round(weatherData.wind.speed);
      const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      const windDirection = compassSector[(weatherData.wind.deg / 22.5).toFixed(0)];
      const sendData = {
        city: weatherData.name,
        longitude: weatherData.coord.lon,
        latitude: weatherData.coord.lat,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        winddirect: windDirection,
        windpower: wind,
        temp: temp,
        date: newDate,
        cloud: imgURL
      };
      try {
        const sqlUpdate = `UPDATE weatherapp SET date='${sendData.date}',longitude =${sendData.longitude},latitude =${sendData.latitude},temp=${sendData.temp}, pressure=${sendData.pressure}, humidity=${sendData.humidity}, windpower=${sendData.windpower},winddirect ='${windDirection}', cloud='${imgURL}' WHERE city='${city}';`;
        await connection.query(sqlUpdate);
        res.status(200).render('index', { sendData: sendData });
      } catch (error) {
        res.status(500).send(error.message);
        logger.error(error.message);
      }
    } else {
      res.status(200).render('index', { sendData: rows[0] });
    }
  } catch (error) {
    res.status(500).send(error.message);
    logger.error(error.message);
  }
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
