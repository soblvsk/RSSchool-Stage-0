let defaultLanguages = 'english';

import { getWeather } from './weather.js';
import { showTimeDate } from './dateTime.js';
import { showGreeting } from './greeting.js';
import { showQoute } from './quotes.js';
import { greetingNameLanguage } from './date.js';
import { setBg } from './setBg.js';
import { settingAppLanguages } from './settingsAppLanguages.js';

import { getDefaultLanguages } from './default.js';

const selectLanguages = document.querySelector('.bottom-languages-select');

function changeSettings() {
  defaultLanguages = getDefaultLanguages();
  setLocalStorage();
  getLocalStorage();
  getWeather();
  showTimeDate();
  showGreeting();
  showQoute();
  settingAppLanguages();
  setBg();

  const inputName = document.querySelector('.name');
  inputName.placeholder = greetingNameLanguage[defaultLanguages];
}

selectLanguages.addEventListener('change', () => {
  changeSettings();
});

const settingsLanguage = document.querySelector('.bottom-languages-select');
const inputTimeShow = document.querySelector('.input-time');
const inputDateShow = document.querySelector('.input-date');
const inputGreetingShow = document.querySelector('.input-greeting');
const inputQuotoShow = document.querySelector('.input-quotos');
const inputAudioplayerShow = document.querySelector('.input-player');
const inputWeatherShow = document.querySelector('.input-weather');
const inputTodoShow = document.querySelector('.input-todo');
const selectSourcePicture = document.querySelector('.bottom-bg-select');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const footerContent = document.querySelector('.footer-content');
const player = document.querySelector('.player');
const weather = document.querySelector('.weather');

function visibleAny(checkbox, part) {
  if (checkbox.checked) {
    part.classList.add('settings-visible');
  } else {
    part.classList.remove('settings-visible');
  }
}

function visiblePartApp() {
  visibleAny(inputAudioplayerShow, player);
  visibleAny(inputWeatherShow, weather);
  visibleAny(inputTimeShow, time);
  visibleAny(inputDateShow, date);
  visibleAny(inputGreetingShow, greetingContainer);
  visibleAny(inputQuotoShow, footerContent);
}

export function setLocalStorage() {
  localStorage.setItem('defaultLanguage', settingsLanguage.value);
  localStorage.setItem('TimeShow', inputTimeShow.checked);
  localStorage.setItem('DateShow', inputDateShow.checked);
  localStorage.setItem('GreetingShow', inputGreetingShow.checked);
  localStorage.setItem('QuotesShow', inputQuotoShow.checked);
  localStorage.setItem('PlayerShow', inputAudioplayerShow.checked);
  localStorage.setItem('WeatherShow', inputWeatherShow.checked);
  localStorage.setItem('pictureSource', selectSourcePicture.value);
}

function loadSettingFromStorage(checkbox, property) {
  if (localStorage.getItem(property)) {
    checkbox.checked = localStorage.getItem(property) === 'false' ? false : true;
  }
}

export function getLocalStorage() {
  if (localStorage.getItem('defaultLanguage')) {
    settingsLanguage.value = localStorage.getItem('defaultLanguage');
  }

  if (localStorage.getItem('pictureSource')) {
    selectSourcePicture.value = localStorage.getItem('pictureSource');
  }

  loadSettingFromStorage(inputTimeShow, 'TimeShow');
  loadSettingFromStorage(inputDateShow, 'DateShow');
  loadSettingFromStorage(inputGreetingShow, 'GreetingShow');
  loadSettingFromStorage(inputQuotoShow, 'QuotesShow');
  loadSettingFromStorage(inputAudioplayerShow, 'PlayerShow');
  loadSettingFromStorage(inputWeatherShow, 'WeatherShow');

  settingAppLanguages();
  visiblePartApp();
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const allInputShow = document.querySelectorAll('.bottom-show-checkbox');

allInputShow.forEach((input) => {
  input.addEventListener('click', () => {
    visiblePartApp();
  });
});

selectSourcePicture.addEventListener('change', () => {
  changeSettings();
});
