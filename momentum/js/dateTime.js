import { local } from './date.js';

let defaultLanguages = 'english';

export function getLocalStorage() {
  if (localStorage.getItem('defaultLanguage')) {
    defaultLanguages = localStorage.getItem('defaultLanguage');
  }
}

export const getDateTime = () => {
  const dateTime = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };

  return {
    time: dateTime.toLocaleTimeString(),
    date: dateTime.toLocaleDateString(local[defaultLanguages], options),
    dateTime: dateTime,
  };
};

export const showTimeDate = () => {
  getLocalStorage();
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');

  const curentTime = getDateTime().time;
  let currentDate = getDateTime().date;

  time.innerHTML = curentTime;
  date.innerHTML = currentDate;

  setTimeout(showTimeDate, 1000);
};
