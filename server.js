/* eslint-disable no-undef */
'use strict';
console.log('server.js is connected!');
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
  response.send('hello from our server!!');
});

//weather route
app.get('/weather', getWeather);
app.get('/movies', getMovies);
// app.get('/yelp', getYelp);











// Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});


// listening to port for server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
