//move all querySelector vars to top?
var searchButton = document.querySelector("#search-button");

//input current city
var getCurrentCity = function() {
    var currentCity = document.querySelector("#city-input").value;

    //adding current date
    var currentDate = moment().format("MM/DD/yyyy");
    console.log(currentDate);

    //append city and current date
    var cityAndDate = document.querySelector("#city-and-date");
    var cityAndDateEl = document.createElement("h3");
    cityAndDateEl.textContent = currentCity + " " + currentDate;
    cityAndDate.appendChild(cityAndDateEl);
};

//add days to current date
/*thoughts here: I could violate DRY and set and append one for every 
card-header, or I could run an array / push it through a for loop?*/
for (i = 0; i < 5; i++) {
    console.log(i);
};

var nextDay = moment().add(i, "days").format("MM/DD/yyyy");
console.log(nextDay);

//append five day forecast dates
var cardHeader = document.querySelector(".card-header");
var nextDayEl = document.createElement("h5");
nextDayEl.textContent = nextDay;
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

searchButton.addEventListener("click", getCurrentCity);
searchButton.addEventListener("click", getCurrentWeather);
searchButton.addEventListener("click", fiveDayForecast);