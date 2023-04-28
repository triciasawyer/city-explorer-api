/* eslint-disable no-undef */
'use strict';
console.log('server.js is connected!');

const getWeather = require('./moduules/weather');


const express = require('express');
require('dotenv').config();
// let weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;


//routes
app.get('/', (request, response) => {
  response.send('hello from our server!!');
});

//weather route
app.get('/weather', handleWeather);
// app.get('/movies', getMovies);
// app.get('/yelp', getYelp);




function handleWeather(request, response) {
  const { latitude, longitude } = request.query;
  getWeather(latitude, longitude)
    .then((summaries) => response.state(200).send(summaries))
    .catch((error) => {
      console.log(error);
      response.state(500).send('Something went wrong!');
    });

}



// Movie route
// async function getMovie(request, response) {
//   let searchQuery = request.query.searchQuery;
//   let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`

// let cityMovies = await axios.get(url)
//  let movieArray = cityMovies.data.results.map(movieData => new Movie(movieData));
//  response.status(200).send(movieArray)
// }


// class Movie{
//   constructor(movieObject) {

//   }
// }







// Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});


// listening to port for server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
