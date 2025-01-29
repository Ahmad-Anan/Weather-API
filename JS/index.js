
let searchInput = document.querySelector(`#searchInput`);
let weatherData;

searchInput.addEventListener("input",function()
{
    if (searchInput.value.length > 3)
    {
        startApp(searchInput.value)
    }
})

async function startApp(city){
    weatherData = await getData(city)
    todayWeather();
    tomorrowWeather();
    afterTomorrowWeather();
}


async function getData(city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=362b94b7ad8447d086c91600243010&q=${city}&days=3`);
    let data = await response.json();
    return data;
}


function todayWeather(){
    document.querySelector(`.today .city`).innerHTML = weatherData.location.name
    document.querySelector(`.today .degree`).innerHTML = weatherData.current.temp_c+`c`
    document.querySelector(`.today #todayImg`).setAttribute("src", "https:"+ weatherData.current.condition.icon)
    document.querySelector(`.today .weatherCondition`).innerHTML = weatherData.current.condition.text
    document.querySelector(`.today #winds`).innerHTML = weatherData.current.wind_mph +` km/h`
}
function tomorrowWeather(){
    document.querySelector('.tomorrow #tomImg').setAttribute('src', 'https:' + weatherData.forecast.forecastday[1].day.condition.icon)
    document.querySelector('.tomorrow #maxTemperature').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c
    document.querySelector('.tomorrow #minTemperature').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c
    document.querySelector('.tomorrow #weatherCondition').innerHTML = weatherData.forecast.forecastday[1].day.condition.text
}
function afterTomorrowWeather(){
    document.querySelector('.after-tomorrow #afterimage').setAttribute('src', 'https:' + weatherData.forecast.forecastday[2].day.condition.icon)
    document.querySelector('.after-tomorrow #AftertomorrowmaxTemperature').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c
    document.querySelector('.after-tomorrow #AftertomorrowminTemperature').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c
    document.querySelector('.after-tomorrow #AftertomorrowweatherCondition').innerHTML = weatherData.forecast.forecastday[2].day.condition.text
}

navigator.geolocation.getCurrentPosition( position=>{

    livelocation = position.coords.latitude+','+position.coords.longitude
    startApp(livelocation)
    
} )






