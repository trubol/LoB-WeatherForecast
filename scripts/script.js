let weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Sacramento, California&units=Imperial&weather.description&appid=f6fb44dea11b7181b008991730597a7f";
let forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Sacramento, California&units=Imperial&weather.description&appid=f6fb44dea11b7181b008991730597a7f";
let dayTxt = document.getElementById("dayTxt"),
  place = document.getElementById("place"),
  temp = document.getElementById("temp"),
  min = document.getElementById("min"),
  max = document.getElementById("max"),
  feelsLike = document.getElementById("feelsLike"),
  speed = document.getElementById("speed"),
  degrees = document.getElementById("degrees"),
  weatherImg = document.getElementById("weatherImg"),
  searchPlace = document.getElementById("searchPlace"),
  injectFav = document.getElementById("injectFav"),
  removeFav = document.getElementById("removeFav"),
  addFavorite = document.getElementById("addFavorite"),
  //removeFav = document.getElementById("removeFav"),
  favArr = [],
  weatherArr = [],
  searchedCity = "",
  favData = JSON.parse(localStorage.getItem("favWeather")),
  forecastPlace = document.getElementById("forecastPlace"),
  forecastSearch = document.getElementById("forecastSearch"),
  forecastBtn = document.getElementById("forecastBtn"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

if (favData && favData != null) {
  favArr = favData;
  for (let i = 0; i < favData.length; i++) {
    if (i == 0) {
      fetchWeather(favData[i].url);
      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", function () {
        fetchWeather(favData[i].url);
      });

      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    } else {
      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", function () {
        fetchWeather(favData[i].url);
      });

      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    }
  }
}
searchBtn = document.getElementById("searchBtn");

function fetchWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getWeather(data);
    });
}
function getWeather(fetchWeather) {
  weatherArr.push(fetchWeather);
  let main = fetchWeather.main,
    startTime = fetchWeather.dt * 1000,
    timeZone = fetchWeather.timezone * 1000,
    convertDate = startTime + timeZone,
    d = new Date(convertDate),
    displayD = d.getUTCDay(),
    w = displayD;

  weatherIcon.src = `http://openweathermap.org/img/wn/${fetchWeather.weather[0].icon}@2x.png`;
  dayTxt.innerText = days[w];
  place.innerText = fetchWeather.name + ", " + fetchWeather.sys.country;
  description.innerText = fetchWeather.weather[0].description;
  temp.innerText = Math.round(main.temp) + " °F";
  min.innerText = Math.round(main.temp_min) + " °F";
  max.innerText = Math.round(main.temp_max) + " °F";
  feelsLike.innerText = Math.round(main.feels_like) + " °F";
  speed.innerText = fetchWeather.wind.speed + " Mph";
  degree.innerText = fetchWeather.wind.deg + " °";
}

function fetchForecast(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getForecast(data);
    });
}

function getForecast(fetchForecast) {
  //weatherArr.push(fetchWeather);
  let forecastMain = fetchForecast;

  //d = new Date(forecastMain.list[3].dt_txt);
  let convertDayOne = forecastMain.list[3].dt * 1000,
    d = new Date(convertDayOne),
    displayD = d.getUTCDay(),
    dayNameOne = days[displayD],
    dateNameOne =
      d.toLocaleString("en-US", { month: "numeric" }) +
      "/" +
      d.toLocaleString("en-US", { day: "numeric" }),
    //dayNameOne = days[d.getDay()];
    convertDayTwo = forecastMain.list[11].dt * 1000,
    e = new Date(convertDayTwo),
    displayE = e.getUTCDay(),
    dayNameTwo = days[displayE],
    dateNameTwo =
      e.toLocaleString("en-US", { month: "numeric" }) +
      "/" +
      e.toLocaleString("en-US", { day: "numeric" });

  (convertDayThree = forecastMain.list[19].dt * 1000),
    (f = new Date(convertDayThree)),
    (displayF = f.getUTCDay()),
    (dayNameThree = days[displayF]),
    (dateNameThree =
      f.toLocaleString("en-US", { month: "numeric" }) +
      "/" +
      f.toLocaleString("en-US", { day: "numeric" }));

  (convertDayFour = forecastMain.list[27].dt * 1000),
    (g = new Date(convertDayFour)),
    (displayG = g.getUTCDay()),
    (dayNameFour = days[displayG]),
    (dateNameFour =
      g.toLocaleString("en-US", { month: "numeric" }) +
      "/" +
      g.toLocaleString("en-US", { day: "numeric" }));

  (convertDayFive = forecastMain.list[35].dt * 1000),
    (h = new Date(convertDayFive)),
    (displayH = h.getUTCDay()),
    (dayNameFive = days[displayH]),
    (dateNameFive =
      h.toLocaleString("en-US", { month: "numeric" }) +
      "/" +
      h.toLocaleString("en-US", { day: "numeric" }));

  forecastIconOne.src = `http://openweathermap.org/img/wn/${fetchForecast.list[3].weather[0].icon}@2x.png`;
  forecastDayOne.innerText = dayNameOne;
  forecastDateOne.innerText = dateNameOne;
  forecastTempOne.innerText =
    Math.round(forecastMain.list[3].main.temp) + " °F";
  forecastDescriptionOne.innerText =
    fetchForecast.list[3].weather[0].description;

  forecastIconTwo.src = `http://openweathermap.org/img/wn/${fetchForecast.list[11].weather[0].icon}@2x.png`;
  forecastDayTwo.innerText = dayNameTwo;
  forecastDateTwo.innerText = dateNameTwo;
  forecastTempTwo.innerText =
    Math.round(forecastMain.list[11].main.temp) + " °F";
  forecastDescriptionTwo.innerText =
    fetchForecast.list[11].weather[0].description;

  forecastDayThree.innerText = dayNameThree;
  forecastIconThree.src = `http://openweathermap.org/img/wn/${fetchForecast.list[19].weather[0].icon}@2x.png`;
  forecastDateThree.innerText = dateNameThree;

  forecastTempThree.innerText =
    Math.round(forecastMain.list[19].main.temp) + " °F";
  forecastDescriptionThree.innerText =
    fetchForecast.list[19].weather[0].description;

  forecastDayFour.innerText = dayNameFour;
  forecastIconFour.src = `http://openweathermap.org/img/wn/${fetchForecast.list[27].weather[0].icon}@2x.png`;
  forecastDateFour.innerText = dateNameFour;

  forecastTempFour.innerText =
    Math.round(forecastMain.list[27].main.temp) + " °F";
  forecastDescriptionFour.innerText =
    fetchForecast.list[27].weather[0].description;

  forecastDayFive.innerText = dayNameFive;
  forecastIconFive.src = `http://openweathermap.org/img/wn/${fetchForecast.list[35].weather[0].icon}@2x.png`;
  forecastDateFive.innerText = dateNameFive;

  forecastTempFive.innerText =
    Math.round(forecastMain.list[35].main.temp) + " °F";
  forecastDescriptionFive.innerText =
    fetchForecast.list[35].weather[0].description;
}

//fetchWeather(weatherUrl);
//fetchForecast(forecastUrl);

searchBtn.addEventListener("click", function () {
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace.value}&units=Imperial&weather.description&appid=f6fb44dea11b7181b008991730597a7f`
  );
  fetchForecast(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchPlace.value}&units=Imperial&weather.description&appid=f6fb44dea11b7181b008991730597a7f`
  );
  searchedCity = searchPlace.value;
});

addFavorite.addEventListener("click", function () {
  let obj = {
    name:
      weatherArr[weatherArr.length - 1].name +
      ", " +
      weatherArr[weatherArr.length - 1].sys.country,
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=Imperial&weather.description&appid=f6fb44dea11b7181b008991730597a7f`,
  };
  alert(
    "You added " +
      weatherArr[weatherArr.length - 1].name +
      ", " +
      weatherArr[weatherArr.length - 1].sys.country +
      " to your Favorites."
  );
  favArr.push(obj);
  /* let colDiv = document.createElement("div");
  colDiv.classList = "col"; */

  let pTag = document.createElement("p");
  pTag.innerText=obj.name;
  
  injectFav.appendChild(pTag);


removeFav.addEventListener("click", function () {
  let ALLCAPS = "SOMETHING IN ALL CAPS";
  for (let i = 0; i < favArr.length; i++) {
    if (place.innerText.toLowerCase() == favArr[i].name.toLowerCase()) {
      favArr.splice(i, 1);
    }
  }
  localStorage.setItem("favWeather", JSON.stringify(favArr));
});

let iTag = document.createElement("i");
//iTag.innerText = obj.name + " ";
iTag.classList = "fas fa-trash";
removeFav.appendChild(iTag);

/* pTag.addEventListener("click", function () {
    fetchWeather(obj.url);
  }); */

iTag.addEventListener("click", function () {
  this.parentNode.parentNode.classList.add("fadeOut");
  setTimeout(function () {
    pTag.remove();
    iTag.remove();
  }, 1000);
});

localStorage.setItem("favWeather", JSON.stringify(favArr));

});