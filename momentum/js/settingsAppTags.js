import { showTimeDate } from './dateTime.js';
import { setBg } from './setBg.js';

let customTags = {
  tag: ['nature'],
};

function loadCustomTags() {
  if (localStorage.getItem('customTags')) {
    customTags = stringToObj(localStorage.getItem('customTags'));
  }
  return {};
}

loadCustomTags();

const inputCustomTags = document.querySelector('.bottom-bg-name-tag');
const customTagsContainer = document.querySelector('.tags');

export function objToString(obj) {
  let string = '';
  for (const key in obj) {
    string += `{${key}: ${obj[key]}}`;
  }
  return string;
}

export function stringToObj(string) {
  let obj = {};
  let newString = string.substring(6, string.length - 1).split(',');
  obj.tag = newString;
  return obj;
}

inputCustomTags.addEventListener('keypress', (event) => {
  if (event.code === 'Enter') {
    const tag = inputCustomTags.value;
    customTags.tag.push(tag);
    localStorage.setItem('customTags', objToString(customTags));
    showTags();
    setBg();
    inputCustomTags.value = '';
  }
});

export function showTags() {
  const customTagItems = document.querySelectorAll('.tags-item');
  customTagItems.forEach((el) => {
    el.remove();
  });

  customTags.tag.forEach((element) => {
    const tag = document.createElement('p');
    tag.innerHTML = element;
    tag.classList.add('tags-item');
    tag.addEventListener('click', () => {
      tag.remove();
      let index = customTags.tag.indexOf(element);
      customTags.tag.splice(index, 1);
      localStorage.setItem('customTags', objToString(customTags));
      setBg();
    });
    customTagsContainer.append(tag);
  });
}

showTags();
