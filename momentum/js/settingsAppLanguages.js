import { getDefaultLanguages } from './default.js';
import { settingApp } from './date.js';

let defaultLanguages = 'english';

const basicBtn = document.querySelector('.form-basic');
const bgBtn = document.querySelector('.form-bg');
const languagesLabel = document.querySelector('.bottom-languages-label');
const showLabel = document.querySelector('.bottom-show-label');
const sourceLabel = document.querySelector('.bottom-bg-label');
const tagsLabel = document.querySelector('.bottom-bg-input-tag');

export function settingAppLanguages() {
  defaultLanguages = getDefaultLanguages();
  basicBtn.innerHTML = settingApp[defaultLanguages][0];
  bgBtn.innerHTML = settingApp[defaultLanguages][1];
  languagesLabel.textContent = `${settingApp[defaultLanguages][2]}: `;
  showLabel.textContent = `${settingApp[defaultLanguages][3]}: `;
  sourceLabel.textContent = `${settingApp[defaultLanguages][4]}: `;
  tagsLabel.textContent = `${settingApp[defaultLanguages][5]}: `;
}
