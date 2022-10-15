import { getDefaultLanguages } from './default.js';
import { greetingNameLanguage } from './date.js';

const inputName = document.querySelector('.name');

export const setLocalStorage = () => {
  localStorage.setItem('name', inputName.value);
};

export const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }

  inputName.placeholder = greetingNameLanguage[getDefaultLanguages()];
};
