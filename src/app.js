const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Example'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Example'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: 'This is some helpful text.',
        name: 'Example'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'please provide a location'
        })
        return
    }
    
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            res.send({
                error: error
            })
            return
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error: error
                })
            return
            }
            res.send({
                location: req.query.address,
                weather: forecastData
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render('error', {
        title: "404 ERROR",
        body: "Unable to find help"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        title: "404 ERROR",
        body: "Url is not found",
        name: 'example'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})