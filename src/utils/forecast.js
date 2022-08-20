const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=eed1712a5328fcea47f2f31292026ce2&query=' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, {body}) => {
        if(error){
        callback('Unable to connect to the weather services!', undefined)
    }
    else if(body.error){
        callback('Unable to find location', undefined)
    }
    else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
    }
})

}

module.exports = forecast