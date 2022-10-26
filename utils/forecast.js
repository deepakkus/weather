const request = require('request')
const chalk = require('chalk') 


const forecast1 = (latitude,longitude,callback)=>{
    //Darksky API call 
    //let url = 'https://api.darksky.net/forecast/1264232d7c486804023c679f7c12ec4b/'+latitude+','+longitude
    let url = `https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}&unit_system=si&fields=temp%2Cfeels_like%2Chumidity%2Cwind_speed%2Cwind_direction%2Cprecipitation%2Cvisibility%2Ccloud_cover%2Cweather_code&apikey=uuzHp06i5YQ4vCUYFwm6t6bDQKze1LhO`
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback(chalk.red.inverse('unable to connect to the weather service!'),undefined)
    }else if (response.body.error){
        callback(chalk.red.inverse('unable to find the location!'),undefined)
    }
    else{
        callback(undefined,response.body)//.daily.data[0].summary 
    }
    })   
}

module.exports = {
    forecast1
}
