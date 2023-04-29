'use strict';

const axios = require('axios');

module.exports = getMovies;



// Movie route
async function getMovies(request, response) {
    let { searchQuery } = request.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=45b661bcbcf607acc1df316673e4b463&language=en-US&query=seattle&page=1&include_adult=false`;

    let cityMovie = await axios.get(url)
    let movieArray = cityMovie.data.movieData.map(movieData => new Movie(movieData));
    response.status(200).send(movieArray)
}


class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${filmObject.poster_path}`
        this.releasedOn = movieObject.release_date;
    }
}


