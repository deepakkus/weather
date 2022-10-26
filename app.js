const express = require('express')
const port = 5001;
const app = express();
const request = require('request')
const loc = require('./utils/locationextractor.js')
const forecast = require('./utils/forecast.js')



app.get('/weather', (req, res) => {
    const result_data ={}
//to pass the loction as an argument in cli
//please modify the way in which you wish to accept to location parameter 
const place = req.query.add
console.log(req.query.add)
if(!place){
    console.log('location not specified')
    return res.status(400).send({message: `Invalid params`, params: {add: 'sohould be an address'}})
}
else{
    //calling the locationextractor.js inside utils to extract latitude and longitudes of the place
    //API used : Mapbox 
        loc.extractor(place,(error,data)=>{
        if(error){
            return console.log(error)
        }
        else{
            //using latitude and longitudes of the place to make another api calls 
            //API used : openWeather and darksky.net 
            forecast.forecast1(data.latitude,data.longitude, (error, forecastData) => {
                if(error){
                   return res.status(500).send(error.message);
                }
                else{
                    //embedding location coordinates in result data
                    result_data.location = {
                        "latitutde":data.latitude,
                        "longitude":data.longitude
                    }
                    //embedding various req parameters and results in result data 
                    result_data.precipitation = forecastData.precipitation;
                    result_data.temp = forecastData.temp;
                    result_data.humidity = forecastData.humidity;
                    result_data.visibility = forecastData.visibility;
                    result_data.wind_speed = forecastData.wind_speed;
                    result_data.wind_direction = forecastData.wind_direction;
                    result_data.weather_code = forecastData.weather_code;
                    result_data.observation_time = forecastData.observation_time;
                    return res.status(200).send(result_data);
                    }
                })
            }
        })
    }   
});

// app.get("/api",(req,res)=>{
// //to store final result data
// const result_data ={}
// //to pass the loction as an argument in cli
// //please modify the way in which you wish to accept to location parameter 
// const place = process.argv[2]//req.query.add
// console.log(req.query.add)
// if(!place){
//     console.log('location not specified')
// }
// else{
//     //calling the locationextractor.js inside utils to extract latitude and longitudes of the place
//     //API used : Mapbox 
//         loc.extractor(place,(error,data)=>{
//         if(error){
//             return console.log(error)
//         }
//         else{
//             //using latitude and longitudes of the place to make another api calls 
//             //API used : openWeather and darksky.net 
//             forecast.forecast1(data.latitude,data.longitude, (error, forecastData) => {
//                 if(error){
//                     console.log('Error', error)
//                 }
//                 else{
//                     //embedding location coordinates in result data
//                     result_data.location = {
//                         "latitutde":data.latitude,
//                         "longitude":data.longitude
//                     }
//                     //embedding various req parameters and results in result data 
//                     result_data.time = forecastData.time;
//                     result_data.precipIntensity = forecastData.precipIntensity
//                     result_data.precipProbability = forecastData.precipProbability
//                     forecast.forecast2(data.latitude,data.longitude, (error, forecastData) => {
//                         if(error){
//                             //console.log('Error', error)
//                             res.status(500).send(error.message);
//                         }
//                         else{
//                             //embedding various req parameters and results in result data
//                             result_data.temp = forecastData.main.temp;
//                             result_data.pressure = forecastData.main.pressure;
//                             result_data.wind_speed = forecastData.wind.speed;
//                             result_data.wind_deg = forecastData.wind.deg;
//                             res.status(200).send(result_data);                        }
//                     })
//                 }
//             })
            

//         }

        
//     })
// }

// });



//1
var server = app.listen(5001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});

console.log(`Serving at http://localhost:${port}`);


// after both the calls complete we can obtain our result in the result_data json object 
