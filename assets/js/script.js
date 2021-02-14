var apiKey = "&appid=fd6392cb6a45826e0c436c4c5ccc3644";
var searchButton = document.querySelector("#search-button");
var inputCity = document.querySelector("#city-input");
var appendUl = document.querySelector("#append-ul");
var clickable = document.querySelector(".clickable");


window.onload = function () {
    var currentCityArray = JSON.parse(window.localStorage.getItem("cities")) || [];

    currentCityArray.forEach(function (currentCity) {
        var appendLiEl = document.createElement("li");
        appendLiEl.setAttribute("class", "city-list");
        appendLiEl.textContent = currentCity;
        appendUl.appendChild(appendLiEl);
    });
}

function getUlCity(e) {
    var currentCity = e.target.innerHTML;
    console.log(currentCity);

    //call getWeather with city from UL
    getWeather(currentCity);
}

function getInputCity() {
    var currentCity = inputCity.value;
    console.log(currentCity);

    //build an array of entered cities to store and push to local storage
    var appendLiEl = document.createElement("li");
    appendLiEl.setAttribute("class", "city-list");
    var currentCityArray = JSON.parse(window.localStorage.getItem("cities")) || [];
    currentCityArray.push(currentCity);
    console.log(currentCityArray);
    appendLiEl.textContent = currentCity;
    window.localStorage.setItem("cities", JSON.stringify(currentCityArray));
    appendUl.appendChild(appendLiEl);

    //call getWeather with city from input
    getWeather(currentCity);
}

function getWeather(currentCity) {
    //var currentCity = inputCity || appendCity
    console.log(currentCity);
    var cityLowercase = currentCity.toLowerCase();

    //clear previous city and date and weather icon
    document.querySelector("#city-and-date").textContent = "";
    document.querySelector("#title-icon").textContent = "";

    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q="
        + cityLowercase + apiKey;

    fetch(apiUrlWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            //select id of each current value slot
            var currentTemp = document.querySelector("#temperature");
            var currentHumidity = document.querySelector("#humidity");
            var currentWindSpeed = document.querySelector("#wind-speed");

            //Kelvin to Fahrenheit converter
            var convertedTemp = ((data.main.temp - 273.15) * 1.8) + 32;

            //pulling current temp, humidity, and wind speed
            currentTemp.textContent = "Temperature: " + convertedTemp.toFixed(2) + " \xB0" + "F";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

            var latitude = data.coord.lat;
            var longitude = data.coord.lon;

            var apiUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat="
                + latitude + "&lon=" + longitude + "&exclude=minutely,hourly" + apiKey;

            fetch(apiUrlOneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    var currentUVIndex = document.querySelector("#uv-index");
                    currentUVIndex.textContent = data.current.uvi;

                    //color code uv index background
                    var colorUVIndex = data.current.uvi

                    if (colorUVIndex < 3) {
                        currentUVIndex.setAttribute("class", "uv-green");
                    }
                    else if (colorUVIndex < 6) {
                        currentUVIndex.setAttribute("class", "uv-yellow");
                    }
                    else if (colorUVIndex < 8) {
                        currentUVIndex.setAttribute("class", "uv-orange");
                    }
                    else if (colorUVIndex < 11) {
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
                    for (i = 0; i < dateArray.length; i++) {
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
                        + (((data.daily[1].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " \xB0" + "F";
                    temp2.textContent = "Temp: "
                        + (((data.daily[2].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " \xB0" + "F";
                    temp3.textContent = "Temp: "
                        + (((data.daily[3].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " \xB0" + "F";
                    temp4.textContent = "Temp: "
                        + (((data.daily[4].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " \xB0" + "F";
                    temp5.textContent = "Temp: "
                        + (((data.daily[5].temp.day - 273.15) * 1.8) + 32).toFixed(2) + " \xB0" + "F";


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

                    //adding current date
                    var currentDate = moment().format("MM/DD/yyyy");

                    //append city and current date and weather icon
                    var icon0 = "http://openweathermap.org/img/wn/"
                        + data.daily[0].weather[0].icon + "@2x.png";

                    var cityAndDate = document.querySelector("#city-and-date");
                    var cityAndDateEl = document.createElement("h3");
                    var titleIcon = document.querySelector("#title-icon");
                    var iconEl = document.createElement("img");
                    iconEl.setAttribute("src", icon0);
                    cityAndDateEl.textContent = currentCity + " " + currentDate + " ";
                    cityAndDate.appendChild(cityAndDateEl);
                    titleIcon.appendChild(iconEl);
                })
        })


};

searchButton.addEventListener("click", getInputCity);
appendUl.addEventListener("click", getUlCity);
//clickable.addEventListener("click", getClickedCity);