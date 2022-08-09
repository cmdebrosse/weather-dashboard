const apiKey = "&appid=cb106dd875c5a574b95cd0454390936e";
const currentDate = new Date();
const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?";
const weatherIconURL = "http://openweathermap.org/img/wn/";

async function getWeather(cityName) {
  const res = await fetch(
    `${currentWeatherURL}${cityName}${apiKey}&units=imperial`
  );
  const currentData = await res.json();
  const { lon, lat } = currentData.coord;

  async function getForecastWeather(lon, lat) {
    const res = await fetch(
      `${forecastWeatherURL}lat=${lat}&lon=${lon}${apiKey}&units=imperial`
    );
    const forecastData = await res.json();
    console.log(forecastData);

    if (forecastData.daily[0].uvi < 3) {
      document.getElementById("currentUVI").textContent =
        forecastData.daily[0].uvi;
      document
        .getElementById("currentUVI")
        .classList.add("rounded", "shadow", "p-1", "bg-success", "text-white");
    } else if (forecastData.daily[0].uvi < 8) {
      document.getElementById("currentUVI").textContent =
        forecastData.daily[0].uvi;
      document
        .getElementById("currentUVI")
        .classList.add("rounded", "shadow", "p-1", "bg-warning", "text-white");
    } else {
      document.getElementById("currentUVI").textContent =
        forecastData.daily[0].uvi;
      document
        .getElementById("currentUVI")
        .classList.add("rounded", "shadow", "p-1", "bg-danger", "text-white");
    }

    const weatherIcon =
      weatherIconURL + forecastData.current.weather[0].icon + "@2x.png";
    console.log(weatherIcon);
    document.getElementById("currentWeatherIcon").src = weatherIcon;
  }
  // console.log(currentData);
  getForecastWeather(lon, lat);

  document.getElementById("cityName").textContent = cityName;
  document.getElementById("todaysDate").textContent =
    currentDate.toLocaleDateString();
  document.getElementById("currentTemp").textContent = currentData.main.temp;
  document.getElementById("currentWind").textContent = currentData.wind.speed;
  document.getElementById("currentHumidity").textContent =
    currentData.main.humidity;
}

getWeather("Hawks");
