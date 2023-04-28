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

async function getWeather(request, response) {
  let { latitude, longitude } = request.query;
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&aqi=no&alerts=no&q=${latitude},${longitude}`;

  let weatherData = await axios.get(url);
  let weatherSummaries = weatherData.data.forecast.forecastday.map(day => {
    return new Forecast(day);
  });
  response.status(200).send(weatherSummaries);
}

class Forecast {
  constructor(forecastObjects) {
    this.date = forecastObjects.date;
    this.forecast = forecastObjects.day.condition.text;
    console.log('TTTTT', forecastObjects.day.condition.text);
  }
}




async function getMovie(request, response) {
  let searchQuery = request.query.searchQuery;
  let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`

let cityMovies = await axios.get(url)
 let movieArray = cityMovies.data.results.map(movieData => new Movie(movieData));
 response.status(200).send(movieArray)
}

class Movie{
  constructor(movieObject) {  
    
  }
}






// Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});


// listening to port for server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
