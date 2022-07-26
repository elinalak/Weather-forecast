//current date-data-group
let currentday = document.querySelector("#current-day");
console.log(currentday);
let data = new Date();
let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-day-temp").innerHTML = Math.ceil(
    response.data.main.temp_max
  );
  document.querySelector("#today-night-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#today-sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#today-wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#today-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#today-pressure").innerHTML =
    response.data.main.pressure;
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let wind = Math.round(response.data.wind.deg / 10) * 10;
  console.log("Wind today is ", wind);
  windDirection.forEach((element, index) => {
    element.dig.forEach((el) => {
      if (wind === el) {
        document.querySelector("#direction").innerHTML = element.name;
      }
    });
  });
  getResponsefor5(response.data.coord);
}
//getting further forecast response
function getResponsefor5(coordinates) {
  let units = "metric";
  let APIkey = "e9f5a6b09cfb46c92f0a8f305e599284";
  let APIurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=3&appid=${APIkey}&units=${units}`;
  axios.get(APIurl).then(displayForecast);
} //`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

//display future weather
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"];
  return days[day];
}

// function getHours(timestamp) {
//   let time = new Date(timestamp * 1000);
//   let gh = time.getHours();
//   if (gh < 10) {
//     gh = `0${gh}`;
//   }
//   let mn = time.getMinutes();
//   if (mn < 10) {
//     mn = `0${mn}`;
//   }
//   return `${gh}:${mn}`;
// }

//Massive of wind directions
let windDirection = [
  { name: "N", dig: [350, 360, 010] },
  { name: "N/NE", dig: [20, 30] },
  { name: "NE", dig: [40, 50] },
  { name: "E/NE", dig: [60, 70] },
  { name: "E", dig: [80, 90, 100] },
  { name: "E/SE", dig: [110, 120] },
  { name: "SE", dig: [130, 140] },
  { name: "S/SE", dig: [150, 160] },
  { name: "S", dig: [170, 180, 190] },
  { name: "S/SW", dig: [200, 210] },
  { name: "SW", dig: [220, 230] },
  { name: "W/SW", dig: [240, 250] },
  { name: "W", dig: [260, 270, 280] },
  { name: "W/NW", dig: [290, 300] },
  { name: "NW", dig: [310, 320] },
  { name: "N/NW", dig: [330, 340] },
];
console.log(windDirection[0].pic);

function displayForecast(response) {
  let responsefuturedata = response.data.daily;
  console.log(responsefuturedata);

  let hoursweather = response.data.hourly;
  console.log(hoursweather);

  // // //weather in 48 hours
  // let hourlyElement = document.querySelector("#hourly");
  // let hourlyHTML = `<div class="row">`;
  // hoursweather.forEach(function (futureHour, index) {
  //   if (index < 5) {
  //     hourlyHTML =
  //       hourlyHTML +
  //       `<div class="col-2 hour-container"> <div class="hour">${getHours(
  //         futureHour.dt
  //       )}</br>Rain, mm: ${futureHour.rain["1h"]} </br>UVI: ${
  //         futureHour.uvi
  //       }</div></div>`;
  //   }
  // });
  // hourlyHTML = hourlyHTML + `</div>`;
  // hourlyElement.innerHTML = hourlyHTML;

  //weather in 5 days
  console.log(windDirection[0].dig);
  let futuredaysElement = document.querySelector("#futureweather");
  let futuredaysHTML = `<div class="row">`;
  responsefuturedata.forEach(function (futureDay, index) {
    if (index < 6 && index > 0) {
      let windfuture = Math.round((futureDay.wind_deg / 10) * 10);
      console.log("Wind future is ", windfuture);
      windDirection.forEach((element) => {
        element.dig.forEach((el) => {
          if (windfuture === el) {
            winda = element.name;
          }
        });
      });
      futuredaysHTML =
        futuredaysHTML +
        `<div class="col day-container">
          <div class="day">
            <b>${formatDay(futureDay.dt)}</b>
            <hr />
            <p class="future-description">${
              futureDay.weather[0].description
            }</p>
            <img src= "http://openweathermap.org/img/wn/${
              futureDay.weather[0].icon
            }@2x.png" alt="clear" class="daily icon" width="42">
            <b><span class="tofaren">${Math.round(
              futureDay.temp.max
            )}</span><span class="temp-icon">&#x2103</span></b>/<span class="tofaren">${Math.round(
          futureDay.temp.min
        )}</span><span class="temp-icon">&#x2103</span><br>
         <small> Humidity: <span>${
           futureDay.humidity
         }</span>% </br> Pressure: <span>${
          futureDay.pressure
        }</span> hpA </br> Wind: <span>${Math.round(
          futureDay.wind_speed
        )}</span> km/h </br> Direction: <span>
        ${winda} </span> </br> <img alt = "compas" src="https://cdn-icons-png.flaticon.com/512/526/526773.png?w=996" width="32" ></small>
      </div>
      </div>`;
    }
  });
  futuredaysHTML = futuredaysHTML + `</div>`;
  futuredaysElement.innerHTML = futuredaysHTML;
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
