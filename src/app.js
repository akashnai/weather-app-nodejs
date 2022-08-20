const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('views', views); 
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pubicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Nai'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash Nai'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Us',
        name: 'Akash Nai'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide an address'
        })
    }else{
        geocode(address, (error, {latitude, longitude, locality} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    locality,
                    address
                })
            })
        })
    }


})

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found', 
        title: 404,
        name: 'Akash Nai'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found', 
        title: 404,
        name: 'Akash Nai'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})