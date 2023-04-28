'use strict';

const axios = require('axios');

module.exports = getMovie;



// Movie route
function getMovie(request, response) {

  let searchQuery = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=45b661bcbcf607acc1df316673e4b463&language=en-US&query=seattle&page=1&include_adult=false`;

 let cityMovies = await axios.get(url)
 let movieArray = cityMovies.data.results.map(movieData => new Movie(movieData));
 response.status(200).send(movieArray)
}



class Movie{
  constructor(movieObject) {  
    this.tableName = 'movies';
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.averageVotes = movieObject.vote_average;
    this.totalVotes = movieObject.vote_count;
    // this.imageUrl = ;
    this.popularity = movieObject.popularity;
    this.releasedOn = movieObject.release_date;

  }
}
