var searchButton = document.querySelector("#search-button");

//adding current date
var currentDate = moment().format("MM/DD/yyyy");
console.log(currentDate);

//add days to current date
/*thoughts here: I could violate DRY and set and append one for every 
card-header, or I could run an array- push it through a for loop?*/
var nextDay = moment().add(1, "days").format("MM/DD/yyyy");
console.log(nextDay);

//append five day forecast dates
var cardHeader = document.querySelector(".card-header");
var nextDayEl = document.createElement("h5");
nextDayEl.textContent = nextDay;
cardHeader.appendChild(nextDayEl);
cardHeader.appendChild(nextDayEl);


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
};

searchButton.addEventListener("click", getCurrentWeather);
searchButton.addEventListener("click", fiveDayForecast);
