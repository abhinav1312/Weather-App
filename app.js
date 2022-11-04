
//IMPORTING THE REQUIRED BUILT IN LIBRARIES
const express = require('express');
const lodash = require('lodash');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path')
const app = express();
const port = process.env.port || 80;
require('dotenv').config()


//IMPORTING THE LOCAL MADE FUNCTIONS
let mod = require(path.join(__dirname, 'lib/lib.js'));


//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'static')))


//SETTING UP EJS
app.set('view engine', 'ejs');


//GET ROUTE(s)
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/weather', function (req, res) {
    if(req.xhr && mod.flag == 1) {
        res.json(mod.weatherList);
    }
    else if(req.xhr && mod.flag == 0) {
        res.json(mod.notFoundObj);
    }
    else {
        res.render('weather');
    }

})


//POST ROUTE
app.post('/weather', async (req, res) => {

    let city = lodash.upperFirst(req.body.cityChoice);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=1&appid=${process.env.WEATHER_API_KEY}&q=${city}`;
    const imgUrl = `https://api.unsplash.com/photos/random/?orientation=portrait&count =1&content_filter=high&client_id=${process.env.IMAGE_API_KEY}&query=${city}`;
    try {
        let weatherRes = await fetch(weatherUrl).then(res => res.json())
        let imgRes = await fetch(imgUrl).then(res => res.json())
        if (weatherRes.cod === '200') {
            mod.flag = 1;
            mod.pushObj(weatherRes, imgRes);
        }
        else {
            mod.flag = 0;
        }
        res.redirect('/weather')
    }catch (error) {console.log(error) }
})

app.get('*', (req, res)=>{
    res.status(404);
    res.render('404');
})


//LISTEN
if (port == null || port == "") { port = 3000; }
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


