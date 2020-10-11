//trying to get an image to append to a span
//adding current date
var currentDate = moment().format("MM/DD/yyyy");

//append city and current date and weather icon
var icon0 = "http://openweathermap.org/img/wn/" 
+ data.daily[0].weather[0].icon + "@2x.png";

var cityAndDate = document.querySelector("#city-and-date");
cityAndDate.textContent = currentCity + " " + currentDate + " ";

var cityAndDateIcon = document.querySelector("#city-and-date-span");
var iconEl = document.createElement("img");
iconEl.setAttribute("src", icon0);
cityAndDateIcon.appendChild(iconEl);