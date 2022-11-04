let flag = 1;  // created to check whether the searched city is found or not 

let notFoundObj = [{   // send this object array when city not found
    message: 0,
    error: false
}];

let weatherList = [  //to store multiple city weather and image
                    // stores a demo card for default display
    {
        temp: 23,
        city: "A demo card",
        minTemp: 22,
        maxTemp: 33,
        windspeed: 4.5,
        weather: 'Sunny',
        message: 1,
        icon: "02n",
        sunset: '0123456789',
        sunrise: '0123456789',
        message: 1,
        visibility: 14,
        pressure: 1,
        humidity: 15,
        error: false,
        imgUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23003F7C'/%3E%3C/svg%3E"
    }
]


//PUSH WEATHER DETAILS IN LIST
function pushObj(obj1, obj2){
    let newObj = {
        city: obj1.city.name,
        temp: obj1.list[0].main.temp,
        minTemp: obj1.list[0].main.temp_min,
        maxTemp: obj1.list[0].main.temp_max,
        humidity: obj1.list[0].main.humidity,
        pressure: obj1.list[0].main.pressure,
        date: obj1.list[0].dt_txt,
        weather: obj1.list[0].weather[0].description,
        icon: obj1.list[0].weather[0].icon,
        windspeed: obj1.list[0].wind.speed,
        icon: obj1.list[0].weather[0].icon,
        sunset: obj1.city.sunset,
        sunrise: obj1.city.sunrise,
        message: 1,
        visibility: obj1.list[0].visibility,
        imgUrl: obj2.urls.regular
    }
    weatherList.unshift(newObj);
}

module.exports = {
    flag,
    notFoundObj,
    weatherList,
    pushObj
}