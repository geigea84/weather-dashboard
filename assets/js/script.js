var searchButton = document.querySelector("#search-button");

//adding current date
var currentDate = new Date();
console.log(currentDate);

//adding current weather
var getCurrentWeather = function(city) {
    //format openweathermap url
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" 
    + city + "&appid=fd6392cb6a45826e0c436c4c5ccc3644";
    console.log(apiUrl);
};

//adding five day forecast
var fiveDayForecast = function(city) {
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?q="
    + city + "&appid=fd6392cb6a45826e0c436c4c5ccc3644";
    console.log(apiUrl);
}

searchButton.addEventListener("click", getCurrentWeather);
searchButton.addEventListener("click", fiveDayForecast);
