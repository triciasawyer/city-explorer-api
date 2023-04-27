/* eslint-disable no-undef */
'use strict';
console.log('server.js is connected!');


const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');

const cors = require('cors');


//2.
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;


app.get('/', (request, response) => {
  //then we need to send something back.
  response.send('hello from our server!!');
});


//add a route
app.get('/weather', (request, response) => {
  try {
    // let searchQuery = request.query.searchQuery;
    // let dataToConstructor = weatherData.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
    // let dataSending =  dataToConstructor.data.map(dayForecast => new Forecast(dayForecast));
    response.send(dataSending);
  } catch(error) {
    next(error);
  }
});


class Forecast {
  constructor(weatherObjects) {
    this.date = weatherObjects.valid_date;
    this.description = weatherObjects.weather.description;
  }
}


// Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});


// listening to port for server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
