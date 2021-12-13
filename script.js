const apiKey = "appid=b44dd980af0d1b9b47081f85d6567370";
var searchName = document.getElementById("search-name");
var searchedCities = document.getElementById("previous-searches");

var getWeatherData = function(searchCity) {
  // format openweathermap api url
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&" + apiKey + "&units=imperial";

  fetch(apiURL).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};