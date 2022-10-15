import { getDateTime } from './dateTime.js';
import { setBg } from './setBg.js';
import { greetingLanguage, greetingNameLanguage } from './date.js';

let defaultLanguages = 'english';

export function getLocalStorage() {
  if (localStorage.getItem('defaultLanguage')) {
    defaultLanguages = localStorage.getItem('defaultLanguage');
  }
}

const returnPartOfday = (namePartDays) => {
  const hour = getDateTime().dateTime.getHours();
  const partDay = Math.floor(hour / 6);

  if (partDay === 0) {
    return `${namePartDays[0]}`;
  }

  if (partDay === 1) {
    return `${namePartDays[1]}`;
  }

  if (partDay === 2) {
    return `${namePartDays[2]}`;
  }

  if (partDay === 3) {
    return `${namePartDays[3]}`;
  }
};

export const getTimeOfDay = (languages) => {
  const namePartDays = greetingLanguage[languages];
  return returnPartOfday(namePartDays);
};

export const partOfDay = () => {
  const namePartDays = greetingLanguage['partOfDay'];
  return returnPartOfday(namePartDays);
};

let lastPartDay = null;

export const showGreeting = () => {
  getLocalStorage();
  if (lastPartDay !== getTimeOfDay(defaultLanguages)) {
    setBg();
  }

  lastPartDay = getTimeOfDay(defaultLanguages);

  const greetingTag = document.querySelector('.greeting');

  greetingTag.innerHTML = `${getTimeOfDay(defaultLanguages)}`;

  setTimeout(showGreeting, 1000);
};

showGreeting();

const inputName = document.querySelector('.name');

const setPlaceholder = () => {
  inputName.placeholder = greetingNameLanguage[defaultLanguages];
};

inputName.addEventListener('keyup', setPlaceholder);
inputName.addEventListener('blur', setPlaceholder);
