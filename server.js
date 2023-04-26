/* eslint-disable no-undef */
'use strict';
console.log('server.js is connected!');


const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
// console.log(weatherData, 'tttttttt');

const cors = require('cors');


//2.
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;


app.get('/', (request, response) => {
  //then we need to send something back.
  response.send('hello from our server!!');
});


//add a weather route
app.get('/weather', (request, response) => {
//   console.log('made it here');
  try {
    let searchQuery = request.query.searchQuery;
    // let lat = request.query.lat;
    // let lon = request.query.lon;
    // console.log('IIIIIIIIIi',searchQuery, lat, lon);
    //
    let dataToConstructor = weatherData.find(weather => weather.city_name === searchQuery);
    // console.log('🚀 ~ file:', dataToConstructor);

    // let dataLat = weatherData.find(weather => weather.lat === lat);
    // let dataLon = weatherData.find(weather => weather.lon === lon);
    let dataSending = new Forecast(dataToConstructor);
    console.log('🚀  dataSending:', dataSending);

    // response.send('dataSending');
    response.send(dataSending);
  } catch(error) {
    // next(error);
  }
});


class Forecast {
  constructor(weatherObjects) {
    this.date = weatherObjects.data[0].valid_date;
    this.description = weatherObjects.data[0].weather.description;
  }
}


// Errors

// app.use((error, request, response) => {
//   response.status(500).send(error.message);
// });



app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
