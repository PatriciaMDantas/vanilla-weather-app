function displayTemperature(response) {
  let temperatureElement = document.querySelector("#Temperature");
  let cityElement = document.querySelector("#City");
  let informationElement = document.querySelector("#information");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innetHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = response.data.weather[0].information;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f727ec0dfcbdd24b05a503781a2f00e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisboa&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
