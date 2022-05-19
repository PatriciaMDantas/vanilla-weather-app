function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-group">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-4">
  <img src="http://openweathermap.org/img/wn/50d@2x.png" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${day}</h5>
    <h2>
      
      <strong class="weather-forecast-temperature-max">18°</strong>
      <span class="weather-forecast-temperature-min">/10°</span>
    </h2>
    <small class="text-muted">
      Something is very shy today. Let s embrace a cloudy day.
    </small>
  </div>
</div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#actualCity");
  let informationElement = document.querySelector("#information");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `src/images/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(actualCity) {
  let apiKey = "f727ec0dfcbdd24b05a503781a2f00e8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${actualCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//let searchButton = document.querySelector("#search-form");
//searchButton.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiustLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celsiustLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiustLink = document.querySelector("#celsius-link");
celsiustLink.addEventListener("click", displayCelciusTemperature);

search("Lisboa");

displayForecast();
