'use strict';

const axios = require('axios');


// Movie route
async function getMovies(request, response) {
    console.log('city?: ',request.query);
    let cityMovieSearch = request.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityMovieSearch}&page=1&include_adult=false`;

    let cityMovie = await axios.get(url);
    console.log('url return data:',cityMovie.data.results);
    let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
    console.log('data to pass to front end',movieArray);
    response.status(200).send(movieArray);
}


class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`
        this.releasedOn = movieObject.release_date;
    }
}


module.exports = getMovies;
