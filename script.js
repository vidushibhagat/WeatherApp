const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weather-icon');

const API_KEY = '8a5ea1ee107c7c099cde3ada3c764684';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeather(city);
    input.value = '';
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayWeather(data) {
  if (data.cod === '404') {
    locationElement.textContent = 'City not found';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    iconElement.innerHTML = '';
  } else {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon" />`;
  }
}
