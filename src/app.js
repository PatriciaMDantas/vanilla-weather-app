function displayTemperature(response) {
  let temperatureElement = document.querySelector("#Temperature");
  let cityElement = document.querySelector("#City");
  temperatureElement.innetHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
}

let apiKey = "f727ec0dfcbdd24b05a503781a2f00e8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisboa&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
