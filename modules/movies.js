'use strict';

const axios = require('axios');

module.exports = getMovies;



// Movie route
async function getMovies(request, response) {
    let { lat, lon } = request.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=seattle&page=1&include_adult=false`;

    let cityMovie = await axios.get(url)
    let movieArray = cityMovie.data.movieData.map(movie => new Movie(movieData));
    response.status(200).send(movieArray)
}


class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`
        this.releasedOn = movieObject.release_date;
    }
}


