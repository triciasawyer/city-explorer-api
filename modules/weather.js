'use strict';

const axios = require('axios');
require('dotenv').config();


//weather route
async function getWeather(request, response) {
    
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





module.exports = getWeather;
