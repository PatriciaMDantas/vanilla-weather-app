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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#Temperature");
  let cityElement = document.querySelector("#City");
  let informationElement = document.querySelector("#information");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = response.data.weather[0].information;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);
function searchCity(event) {
  event.preventDefault();
  let actualCity = document.querySelector("#actualCity");
  let cityInput = document.querySelector("#cityInput");
  actualCity.innerHTML = cityInput.value;
}

let apiKey = "f727ec0dfcbdd24b05a503781a2f00e8";
let City = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
