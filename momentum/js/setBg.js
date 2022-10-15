import { partOfDay } from '../js/greeting.js';
import { stringToObj } from './settingsAppTags.js';

let pictireSource = 'github';
let customTags = [];
const img = new Image();

export function getLocalStorage() {
  if (localStorage.getItem('pictureSource')) {
    pictireSource = localStorage.getItem('pictureSource');
  }

  if (localStorage.getItem('customTags')) {
    customTags = stringToObj(localStorage.getItem('customTags'));
  }
}

const getRandomNum = () => {
  const num = Math.round(Math.random() * 20);

  if (num === 0) {
    let result = num + 1;
    return result;
  }

  return num;
};

const padStartNum = (number) => {
  const string = number.toString().padStart(2, '0');
  return string;
};

let rndNum = getRandomNum();

function getlinkGIthub(partDay, stringNumber) {
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${stringNumber}.jpg`;
}

async function getLinkUnsplash(partDay, stringNumber) {
  let url = ``;
  if (customTags.length === 0) {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${partDay}&client_id=gJz2fUfYGaq7ClaXLDmNv60Ou3nQMT_ocwji9gAYxUo`;
  } else {
    const randomTagNum = Math.floor(Math.random() * customTags.tag.length);
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${customTags.tag[randomTagNum]}&client_id=gJz2fUfYGaq7ClaXLDmNv60Ou3nQMT_ocwji9gAYxUo`;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    img.src = await data.urls.regular;
  } catch (error) {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${stringNumber}.jpg`;
  }
}

async function getLinkflickr(partDay, stringNumber) {
  let url = ``;
  if (customTags.length === 0) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3953ca10a158fb5ff5a296f14d7d5623&tags=${partDay}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    const randomTagNum = Math.floor(Math.random() * customTags.tag.length);
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3953ca10a158fb5ff5a296f14d7d5623&tags=${customTags.tag[randomTagNum]}&extras=url_l&format=json&nojsoncallback=1`;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    const randomNum = Math.floor(Math.random() * data.photos.photo.length);
    img.src = await data.photos.photo[randomNum].url_l;
  } catch (error) {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partDay}/${stringNumber}.jpg`;
  }
}

export const setBg = () => {
  getLocalStorage();
  const partDay = partOfDay();
  const stringNumber = padStartNum(rndNum);

  if (pictireSource === 'github') {
    getlinkGIthub(partDay, stringNumber);
  } else if (pictireSource === 'unsplash') {
    getLinkUnsplash(partDay, stringNumber);
  } else {
    getLinkflickr(partDay, stringNumber);
  }
};

const getSlideNext = () => {
  if (rndNum !== 20) {
    rndNum++;
  } else {
    rndNum = 1;
  }
  setBg();
};

const getSlidePrev = () => {
  if (rndNum !== 1) {
    rndNum--;
  } else {
    rndNum = 20;
  }
  setBg();
};

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

img.addEventListener('load', () => {
  document.body.style.backgroundImage = `url('${img.src}')`;
});
