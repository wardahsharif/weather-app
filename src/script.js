let date = new Date();

let h3 = document.querySelector("h3");

let currentHour = date.getHours();
if(currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if(currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = currentDays[date.getDay()];

h3.innerHTML = `${currentDay}  ${currentHour}:${currentMinutes}`;

function celsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `2`;
}
let celsius = document.getElementById("celsius");
celsius.addEventListener("click", celsiusTemperature);

function FahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `60`;
}
let Fahrenheit = document.getElementById("Fahrenheit");
Fahrenheit.addEventListener("click", FahrenheitTemperature);

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `${temperature}℃`;
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description.toUpperCase();
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
   let wind = document.querySelector("#wind");
   wind.innerHTML = Math.round(response.data.wind.speed);
   let feelsLike = document.querySelector("#feelsLike");
   feelsLike.innerHTML = Math.round(response.data.main.feels_like);
   let icon = document.querySelector("#icon");
   icon.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   icon.setAttribute("alt",response.data.weather[0].description.toUpperCase() )
   
}

function cityUrl(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityUrl);

function showPosition(position) {
  console.log(position);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrent);

