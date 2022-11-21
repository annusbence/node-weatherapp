'use strict'

const express = require('express');
const app = express();
const mysql = require('mysql');

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
  res.sendFile(__dirname + '../public/index.html')
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});