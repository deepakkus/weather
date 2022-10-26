'use strict'
const request = require('request');
const forecast = require('./utils/forecast.js');

exports.getWeather = (event, context, callback) => {
    const result_data = {};
    const lat = event.queryStringParameters.lat;
    const lng = event.queryStringParameters.lng;
    if(!lat || !lng){
        const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'There is no location specified, nothing to return',
            }),
          };
        callback(null, response);
    } else {
        forecast.forecast1(lat,lng, (error, forecastData) => {            
            if(error){
                callback(error, null);
            }
            else{
                //embedding location coordinates in result data
                result_data.location = {
                    "latitutde": lat,
                    "longitude": lng
                };
                result_data.precipitation = forecastData.precipitation;
                result_data.temp = forecastData.temp;
                result_data.humidity = forecastData.humidity;
                result_data.visibility = forecastData.visibility;
                result_data.wind_speed = forecastData.wind_speed;
                result_data.wind_direction = forecastData.wind_direction;
                result_data.weather_code = forecastData.weather_code;
                result_data.observation_time = forecastData.observation_time;

                const response = {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        body: JSON.stringify(result_data),
                    };
                callback(null, response);                        
        }});
    }
};
