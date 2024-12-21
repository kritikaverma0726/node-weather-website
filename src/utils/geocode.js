const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ encodeURIComponent(address) +"&appid=e&units=metric"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.coord.lat,
                longitude: body.coord.lon
            })
        }
    })
}

module.exports = geocode

