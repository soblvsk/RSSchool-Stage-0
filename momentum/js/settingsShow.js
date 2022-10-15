import { showTags } from './settingsAppTags.js';

const settingsBtn = document.querySelector('.settings-button');
const settingsForm = document.querySelector('.settings-form');

settingsBtn.addEventListener('click', () => {
  settingsForm.classList.toggle('settings-form--active');
  showTags();
});

window.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.closest('.settings-form') && !target.closest('.settings-button')) {
    settingsForm.classList.remove('settings-form--active');
  }
});
