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



function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}




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
   
    celsius = response.data.main.temp;

    getForecast(response.data.coord);
   
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




function FahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2")
celsiusElement.classList.remove("active");
fahrenheit.classList.add("active");
  let fahrenheitElement = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitElement)}℉`;
}



let fahrenheit = document.getElementById("Fahrenheit");
fahrenheit.addEventListener("click", FahrenheitTemperature);

function celsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  celsiusElement.classList.add("active");
fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = `${Math.round(celsius)}℃`;
}

let celsius = null;



let celsiusElement = document.getElementById("celsius");
celsiusElement.addEventListener("click", celsiusTemperature);



function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon" ,"Tue" , "Wed" , "Thu", "Fri" , "Sat"];
  return days[day];
  
}

function displayForecast(response) {

let forecast = response.data.daily;
 let forecastElement = document.querySelector("#forecast");

 forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index){
  if (index < 5) {
  forecastHTML = forecastHTML + `
  <div class="col">
        <div class="card friday">
        <img
       class="forecast-icon"
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
        </br>
     ${formatDay(forecastDay.dt)} </br>
      <span class="maxTemp">
      ${Math.round(forecastDay.temp.max)}℃ </span> 
      <span class="minTemp">
       ${Math.round(forecastDay.temp.min)}℃ </span>
    </div>
    </div>`
  };
})

    
    

 

      forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;

}