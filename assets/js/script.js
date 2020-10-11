//move all querySelector vars to top?
var searchButton = document.querySelector("#search-button");
var apiKey       = "&appid=fd6392cb6a45826e0c436c4c5ccc3644";

//input current city
/*will need an api call to get all applicable cities,
add if response.ok else alert, add to array of cities
to create a search history (local storage with setItem
(json.stringify), recall with getItem (json.parse)),
create a dynamic list where the array can plug in,
use for loop to set max length of array*/
var getCurrentCity = function() {
    var currentCity = document.querySelector("#city-input").value;

    var cityLowercase = currentCity.toLowerCase();

    //clear previous city and date that was entered
    document.querySelector("#city-and-date").textContent = "";

    //insert another function here to set apart currentWeather from fiveDayForecast?

    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + cityLowercase + apiKey;

    fetch(apiUrlWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        //left these vars local because no need to call them elsewhere
        var currentTemp = document.querySelector("#temperature");
        var currentHumidity = document.querySelector("#humidity");
        var currentWindSpeed = document.querySelector("#wind-speed");

        //Kelvin to Fahrenheit converter
        var convertedTemp = ((data.main.temp-273.15)*1.8)+32;

        //need to connect response.data to corresponding values in api
        currentTemp.textContent = "Temperature: " + convertedTemp.toFixed(2) + (" \xB0") + "F";
        currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
        currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var apiUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat="
        + latitude + "&lon=" + longitude + "&exclude=minutely,hourly" + apiKey;

        fetch(apiUrlOneCall)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        
            var currentUVIndex = document.querySelector("#uv-index");
            currentUVIndex.textContent = "UV Index: " + data.current.uvi;

            //color code uv index background: need to set up in css
            //connect proper response data for uv index
            var colorUVIndex = data.current.uvi
            console.log(colorUVIndex);

            if(colorUVIndex < 3) {
                currentUVIndex.setAttribute("class", "uv-green");
            }
            else if(colorUVIndex < 6) {
                currentUVIndex.setAttribute("class", "uv-yellow");
            }
            else if(colorUVIndex < 8) {
                currentUVIndex.setAttribute("class", "uv-orange");
            }
            else if(colorUVIndex < 11) {
                currentUVIndex.setAttribute("class", "uv-red");
            }
            else {
                currentUVIndex.setAttribute("class", "uv-violet");
            }
        })
    })
    
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
card-header, or I could run an array / push it through a for loop?
Suggestion was to use the info pulled from the API to populate each date*/
/*
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
*/

/*
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
*/

searchButton.addEventListener("click", getCurrentCity);
//searchButton.addEventListener("click", getCurrentWeather);
//searchButton.addEventListener("click", fiveDayForecast);