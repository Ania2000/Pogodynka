const API_KEY = "118c92a5db298666e500bceaffc78e19";
const cityName = document.getElementById("CityName");
const cityCountry = document.getElementById("CityCountry");
const weather = document.getElementById("Weather");
const wind = document.getElementById("Wind");
const clouds = document.getElementById("Clouds");
const temp = document.getElementById("CityTemp");
const cityFeelsLike = document.getElementById("CityFeelsLike");
const searchBtn = document.getElementById("SearchBtn");
const citySearch = document.getElementById("CitySearch");
const appWeather = document.getElementById("WeatherInfo");
const showLocationBtn = document.getElementById("ShowLocationBtn");
const errorMessage = document.getElementById("ErrorMessage");
const weatherIcon = document.getElementById("CityWeatherIcon");

const convertToCelsius = (a) => {
  return Math.round(a - 273.15) + "°C";
};

const weatherInfo = (info) => {
  appWeather.style.display = "block";
  console.log("Pogoda na dziś", info);
  cityName.textContent = info.name;
  cityCountry.textContent = info.sys.country;
  weather.textContent = info.weather[0].description;
  wind.textContent = info.wind.speed + "m/s";
  clouds.textContent = info.clouds.all;
  temp.textContent = convertToCelsius(info.main.temp);
  cityFeelsLike.textContent = convertToCelsius(info.main.feels_like);
  weatherIcon.src = `http://openweathermap.org/img/wn/${info.weather[0].icon}.png`;
  errorMessage.textContent = "";
};

const getWeatherBySearch = (city) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => errMsg(err));
};
const errMsg = () => {
  return (errorMessage.textContent = "Podane miasto nie istenieje");
};

// temp.textContent = Math.round(info.main.temp - 273.15) + "°C";
// cityFeelsLike.textContent = (info.main.feels_like - 273.15).toFixed() + "°C";

const getWeatherByLocation = (coords) => {
  console.log(coords);
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => console.log(err));
};

const getMyLocation = () => {
  return navigator.geolocation.getCurrentPosition((position) =>
    getWeatherByLocation(position.coords)
  );
};

//getMyLocation();

// getWeatherByLocation();

const getSearchResult = () => {
  if (citySearch.value != "") {
    return getWeatherBySearch(citySearch.value);
  } else {
    console.log("Nic nie wpsiano");
  }
};

searchBtn.addEventListener("click", getSearchResult);
showLocationBtn.addEventListener("click", getMyLocation);
