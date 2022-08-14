// API URLs
const apiKey = "&appid=cb106dd875c5a574b95cd0454390936e";
const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?";
const weatherIconURL = "http://openweathermap.org/img/wn/";

// Create new Date object
const currentDate = new Date();

// Document selectors
const searchCityName = document.getElementById("searchCityName");
const searchButton = document.getElementById("searchButton");
const todaysDate = document.getElementById("todaysDate");
const cityName = document.getElementById("cityName");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const currentTemp = document.getElementById("currentTemp");
const currentWind = document.getElementById("currentWind");
const currentHumidity = document.getElementById("currentHumidity");
const currentUVI = document.getElementById("currentUVI");

async function getWeather(newCityName) {
  const res = await fetch(
    `${currentWeatherURL}${newCityName}${apiKey}&units=imperial`
  );
  const currentData = await res.json();
  const { lon, lat } = currentData.coord;

  // Display current weather data
  const weatherIcon = weatherIconURL + currentData.weather[0].icon + "@2x.png";
  currentWeatherIcon.src = weatherIcon;

  cityName.textContent = currentData.name;
  todaysDate.textContent = currentDate.toLocaleDateString();
  currentTemp.textContent = currentData.main.temp;
  currentWind.textContent = currentData.wind.speed;
  currentHumidity.textContent = currentData.main.humidity;

  async function getForecastWeather(lon, lat) {
    const res = await fetch(
      `${forecastWeatherURL}lat=${lat}&lon=${lon}${apiKey}&units=imperial`
    );
    const forecastData = await res.json();
    console.log(currentData);
    console.log(forecastData);

    if (forecastData.daily[0].uvi < 3) {
      currentUVI.textContent = forecastData.daily[0].uvi;
      currentUVI.classList.add(
        "rounded",
        "shadow",
        "p-1",
        "bg-success",
        "text-white"
      );
    } else if (forecastData.daily[0].uvi < 8) {
      currentUVI.textContent = forecastData.daily[0].uvi;
      currentUVI.classList.add(
        "rounded",
        "shadow",
        "p-1",
        "bg-warning",
        "text-white"
      );
    } else {
      currentUVI.textContent = forecastData.daily[0].uvi;
      currentUVI.classList.add(
        "rounded",
        "shadow",
        "p-1",
        "bg-danger",
        "text-white"
      );
    }

    // Display forecast weather data
    // Day 1
    const day1 = new Date(currentDate.setDate(currentDate.getDate() + 1));
    document.getElementById("day-one").textContent = day1.toLocaleDateString();
    document.getElementById("day-one-temp").textContent =
      forecastData.daily[1].temp.day;
    document.getElementById("day-one-wind").textContent =
      forecastData.daily[1].wind_gust;
    document.getElementById("day-one-humidity").textContent =
      forecastData.daily[1].humidity;

    // Day 2
    const day2 = new Date(currentDate.setDate(currentDate.getDate() + 1));
    document.getElementById("day-two").textContent = day2.toLocaleDateString();
    document.getElementById("day-two-temp").textContent =
      forecastData.daily[2].temp.day;
    document.getElementById("day-two-wind").textContent =
      forecastData.daily[2].wind_gust;
    document.getElementById("day-two-humidity").textContent =
      forecastData.daily[2].humidity;

    // Day 3
    const day3 = new Date(currentDate.setDate(currentDate.getDate() + 1));
    document.getElementById("day-three").textContent =
      day3.toLocaleDateString();
    document.getElementById("day-three-temp").textContent =
      forecastData.daily[3].temp.day;
    document.getElementById("day-three-wind").textContent =
      forecastData.daily[3].wind_gust;
    document.getElementById("day-three-humidity").textContent =
      forecastData.daily[3].humidity;

    // Day 4
    const day4 = new Date(currentDate.setDate(currentDate.getDate() + 1));
    document.getElementById("day-four").textContent = day4.toLocaleDateString();
    document.getElementById("day-four-temp").textContent =
      forecastData.daily[4].temp.day;
    document.getElementById("day-four-wind").textContent =
      forecastData.daily[4].wind_gust;
    document.getElementById("day-four-humidity").textContent =
      forecastData.daily[4].humidity;

    // Day 5
    const day5 = new Date(currentDate.setDate(currentDate.getDate() + 1));
    document.getElementById("day-five").textContent = day5.toLocaleDateString();
    document.getElementById("day-five-temp").textContent =
      forecastData.daily[5].temp.day;
    document.getElementById("day-five-wind").textContent =
      forecastData.daily[5].wind_gust;
    document.getElementById("day-five-humidity").textContent =
      forecastData.daily[5].humidity;
  }

  getForecastWeather(lon, lat);
}

searchButton.addEventListener("click", function () {
  const newSearchCity = searchCityName.value;
  getWeather(newSearchCity);
});
