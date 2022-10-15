import { weatherNameLanguage, weatherLanguage, weatherErrorLanguage } from './date.js';

let defaultLanguages = 'english';

export function getLocalStorage() {
  if (localStorage.getItem('defaultLanguage')) {
    defaultLanguages = localStorage.getItem('defaultLanguage');
  }
}

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const nameCity = document.querySelector('.city');
const error = document.querySelector('.weather-error');

export async function getWeather() {
  getLocalStorage();
  nameCity.placeholder = weatherNameLanguage[defaultLanguages];
  let city = 'Минск';

  if (localStorage.getItem('city') !== '') {
    city = localStorage.getItem('city');
  }
  if (nameCity.value !== '') {
    city = nameCity.value;
  }
  if (city === null) {
    city = 'Минск';
  }

  nameCity.value = city;

  if (nameCity.value !== '') {
    localStorage.setItem('city', nameCity.value);
  }
  if (localStorage.getItem('city') !== null) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${weatherLanguage[defaultLanguages][0]}&appid=f4385e317c9e508e158193a2670f15f0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== '404') {
      error.innerHTML = '';
      const tempRound = Math.round(data.main.temp);
      const windSpeed = Math.floor(data.wind.speed);
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.innerHTML = `${tempRound}°C`;
      weatherDescription.innerHTML = data.weather[0].description;
      wind.innerHTML = `${weatherLanguage[defaultLanguages][1]}: ${windSpeed} ${weatherLanguage[defaultLanguages][2]}`;
      humidity.innerHTML = `${weatherLanguage[defaultLanguages][3]}: ${data.main.humidity} %`;
    } else {
      error.innerHTML = `${weatherErrorLanguage[defaultLanguages]} ${city}`;
      weatherIcon.className = 'weather-icon owf';
      temperature.innerHTML = '';
      weatherDescription.innerHTML = '';
      wind.innerHTML = '';
      humidity.innerHTML = '';
    }
  }

  setTimeout(getWeather, 3600000);
}

const setCity = (event) => {
  if (event.code === 'Enter' || event.type === 'blur') {
    getWeather();
    nameCity.blur();
  }
};

nameCity.addEventListener('keypress', setCity);
nameCity.addEventListener('blur', setCity);

getWeather();
