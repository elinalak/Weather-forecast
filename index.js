//current date-data-group
let currentday = document.querySelector("#current-day");
console.log(currentday);
let data = new Date();
let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let hh = data.getHours();
if (hh < 10) hh = `0${hh}`;
let min = data.getMinutes();
if (min < 10) min = `0${min}`;
let time = `${hh}:${min}`;
//current day and time
currentday.innerHTML = `${day[data.getDay()]} ${time}`;

let currentdate = document.querySelector("#current-date");
console.log(currentdate);
let yyyy = data.getFullYear();
let mm = data.getMonth() + 1;
let dd = data.getDate();
if (dd < 10) dd = `0${dd}`;
if (mm < 10) mm = `0${mm}`;
console.log(`${dd}/${mm}/${yyyy}`);
//current date
currentdate.innerHTML = `${dd}/${mm}/${yyyy}`;

//Add a search engine, when searching for a city
function ShowWeather(response) {
  console.log(response.data);
  document.querySelector("#today-day-temp").innerHTML = Math.ceil(
    response.data.main.temp_max
  );
  document.querySelector("#today-night-temp").innerHTML = Math.ceil(
    response.data.main.temp_min
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
  //http://openweathermap.org/img/wn/10d@2x.png
  document.querySelector("#today-wind-speed").innerHTML = Math.ceil(
    response.data.wind.speed
  );
  document.querySelector("#today-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#today-pressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("h1").innerHTML = response.data.name;
}

let newcity = document.querySelector(".input.form");
newcity.addEventListener("click", cityByClick);
newcity.addEventListener("keypress", cityByEnter);

function cityByClick(event) {
  event.preventDefault;
  let city = document.querySelector("#input-city").value;
  GetWeather(city);
}

function cityByEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let city = document.querySelector("#input-city").value;
    GetWeather(city);
  }
}

function GetWeather(city) {
  let units = "metric";
  let APIkey = "e9f5a6b09cfb46c92f0a8f305e599284";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=${units}`;
  axios.get(APIurl).then(ShowWeather);
} //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${newplace.innerHTML}&appid=${APIkey}&units=${units}

//* Get geolocation
let loc = document.querySelector("#current-location");
console.log(loc);
loc.addEventListener("click", clickLocation);
function clickLocation(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
  function handlePosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let units = "metric";
    let APIkey = "e9f5a6b09cfb46c92f0a8f305e599284";
    let APIurl =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude +
      "&appid=" +
      APIkey +
      "&units=" +
      units;
    axios.get(APIurl).then(ShowWeather);
    ShowWeather();
  }
}

//add a link to convert temperature to Fahrenheit

function clickBetweenTemp(event) {
  event.preventDefault;
  let cselector = document.querySelectorAll(".temp-icon");
  console.log(cselector[1].innerHTML);
  if (cselector[1].innerHTML === "℃") {
    let f = document.querySelectorAll(".tofaren");
    f.forEach((x) => {
      newF = Math.round((x.innerHTML * 9) / 5 + 32);
      x.innerHTML = `${newF}`;
    });
    cselector.forEach((f) => {
      f.innerHTML = "&#8457";
    });
  }
}
let tempInFarenheit = document.querySelector("#farenheit");
console.log(tempInFarenheit);
tempInFarenheit.addEventListener("click", clickBetweenTemp);

//add a link to convert temperature to Celsium
function backToCelsius(event) {
  event.preventDefault;
  let fselector = document.querySelectorAll(".temp-icon");
  console.log(fselector[1].innerHTML);
  if (fselector[1].innerHTML === "℉") {
    let c = document.querySelectorAll(".tofaren");
    c.forEach((y) => {
      newC = Math.round(((y.innerHTML - 32) * 5) / 9);
      y.innerHTML = `${newC}`;
      fselector.forEach((cl) => {
        cl.innerHTML = "&#x2103";
      });
    });
  }
}

let tempInCelsius = document.querySelector("#celcius");
console.log(tempInCelsius);
tempInCelsius.addEventListener("click", backToCelsius);
GetWeather("Krakow");
