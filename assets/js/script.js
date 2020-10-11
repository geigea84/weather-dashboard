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
var getWeather = function() {
    var currentCity = document.querySelector("#city-input").value;

    var cityLowercase = currentCity.toLowerCase();

    //clear previous city and date that was entered
    document.querySelector("#city-and-date").textContent = "";

    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + cityLowercase + apiKey;

    fetch(apiUrlWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        //select id of each current value slot
        var currentTemp = document.querySelector("#temperature");
        var currentHumidity = document.querySelector("#humidity");
        var currentWindSpeed = document.querySelector("#wind-speed");

        //Kelvin to Fahrenheit converter
        var convertedTemp = ((data.main.temp-273.15)*1.8)+32;

        //pulling current temp, humidity, and wind speed
        currentTemp.textContent = "Temperature: " + convertedTemp.toFixed(2) + " \xB0" + "F";
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

            //color code uv index background
            var colorUVIndex = data.current.uvi

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

            //add dates to five day forecast
            var dayElements = [
                document.querySelector("#day1"),
                document.querySelector("#day2"),
                document.querySelector("#day3"),
                document.querySelector("#day4"),
                document.querySelector("#day5")
            ];

            //create array of five day forecast timestamp values
            var dateArray = [
                data.daily[1].dt,
                data.daily[2].dt,
                data.daily[3].dt,
                data.daily[4].dt,
                data.daily[5].dt
            ];

            //convert unix timestamps to standard dates
            for(i = 0; i < dateArray.length; i++) {
                var milliseconds = dateArray[i] * 1000;
                var dateObject = new Date(milliseconds);
                var formattedDate = dateObject.toLocaleDateString();
                dayElements[i].textContent = formattedDate;
            };

            //set weather icons for five day forecast
            var icon1 = document.querySelector("#icon1");
            var icon2 = document.querySelector("#icon2");
            var icon3 = document.querySelector("#icon3");
            var icon4 = document.querySelector("#icon4");
            var icon5 = document.querySelector("#icon5");

            icon1.setAttribute("src", "http://openweathermap.org/img/wn/" 
            + data.daily[1].weather[0].icon + "@2x.png");
            icon2.setAttribute("src", "http://openweathermap.org/img/wn/" 
            + data.daily[2].weather[0].icon + "@2x.png");
            icon3.setAttribute("src", "http://openweathermap.org/img/wn/" 
            + data.daily[3].weather[0].icon + "@2x.png");
            icon4.setAttribute("src", "http://openweathermap.org/img/wn/" 
            + data.daily[4].weather[0].icon + "@2x.png");
            icon5.setAttribute("src", "http://openweathermap.org/img/wn/" 
            + data.daily[5].weather[0].icon + "@2x.png");

            //set temperature for five day forecast with Kelvin to F converter
            var temp1 = document.querySelector("#temp1");
            var temp2 = document.querySelector("#temp2");
            var temp3 = document.querySelector("#temp3");
            var temp4 = document.querySelector("#temp4");
            var temp5 = document.querySelector("#temp5");

            temp1.textContent = "Temp: " 
            + (((data.daily[1].temp.day-273.15)*1.8)+32).toFixed(2) + " \xB0" + "F";
            temp2.textContent = "Temp: " 
            + (((data.daily[2].temp.day-273.15)*1.8)+32).toFixed(2) + " \xB0" + "F";
            temp3.textContent = "Temp: " 
            + (((data.daily[3].temp.day-273.15)*1.8)+32).toFixed(2) + " \xB0" + "F";
            temp4.textContent = "Temp: " 
            + (((data.daily[4].temp.day-273.15)*1.8)+32).toFixed(2) + " \xB0" + "F";
            temp5.textContent = "Temp: " 
            + (((data.daily[5].temp.day-273.15)*1.8)+32).toFixed(2) + " \xB0" + "F";
            

            //set humidity for five day forecast
            var humid1 = document.querySelector("#humid1");
            var humid2 = document.querySelector("#humid2");
            var humid3 = document.querySelector("#humid3");
            var humid4 = document.querySelector("#humid4");
            var humid5 = document.querySelector("#humid5");

            humid1.textContent = "Humidity: " + data.daily[1].humidity + "%";
            humid2.textContent = "Humidity: " + data.daily[2].humidity + "%";
            humid3.textContent = "Humidity: " + data.daily[3].humidity + "%";
            humid4.textContent = "Humidity: " + data.daily[4].humidity + "%";
            humid5.textContent = "Humidity: " + data.daily[5].humidity + "%";
        })
    })
    
    //adding current date
    var currentDate = moment().format("MM/DD/yyyy");

    //append city and current date
    var cityAndDate = document.querySelector("#city-and-date");
    var cityAndDateEl = document.createElement("h3");
    cityAndDateEl.textContent = currentCity + " " + currentDate;
    cityAndDate.appendChild(cityAndDateEl);
};

searchButton.addEventListener("click", getWeather);