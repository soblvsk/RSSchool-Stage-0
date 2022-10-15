import { showTimeDate } from '../js/dateTime.js';
import {} from '../js/greeting.js';
import { setLocalStorage, getLocalStorage } from '../js/localStorage.js';
import {} from '../js/weather.js';
import {} from './player.js';
import {} from './settingsShow.js';
import {} from './settingsAppTop.js';
import {} from './settingsAppLanguages.js';
import {} from './settingsApp.js';
import {} from './settingsAppTags.js';

showTimeDate();

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

console.log(
  '1. Часы и календарь +15\n2. Приветствие +10\n3. Смена фонового изображения +20\n4. Виджет погоды +15\n5. Виджет цитата дня +10\n6.Аудиоплеер +15\n7.Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n8. Перевод приложения на два языка (en/ru или en/be) +15\n9. Получение фонового изображения от API +10 Пункт считается выполненным, если фоновые изображения, полученные от API, отвечают требованиям к фоновым изображениям, указанным в пункте 3: их можно перелистывать кликами по стрелкам, обеспечивается плавная смена фоновых изображений, ссылка на фоновое изображение формируется с учётом времени суток, если пользователь не указал другие теги для их получения. Не проверяем и не реализуем последовательное перелистывание изображений и перелистывание изображений по кругу.\n10. Настройки приложения +20\n11. Дополнительный функционал на выбор +0\n\nВсего: 150 баллов',
);
