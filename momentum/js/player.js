import playList from './playList.js';

const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const progressBarCurrent = document.querySelector('.progress-duration--current');
const progressDuration = document.querySelector('.progress-duration');
const curentTitle = document.querySelector('.player-title-track');
const timeTrack = document.querySelector('.player-time-track');
const mute = document.querySelector('.mute');
const volumeLevel = document.querySelector('.player-volume-level');

const audio = new Audio();

let currentPlay = 0;
let isPlay = false;

audio.volume = 0.7;

let currentLevelVolume = audio.volume;

audio.src = playList[currentPlay].src;

const createPlayList = () => {
  const playListContainer = document.querySelector('.play-list');
  let count = 1;

  playList.forEach((el) => {
    const item = document.createElement('li');

    item.classList.add('play-item');
    item.classList.add('btn-small');
    item.classList.add('play-btn');
    item.textContent = `${count}. ${el.title}`;

    playListContainer.append(item);
    count++;
  });

  curentTitle.innerHTML = `${1}. ${playList[0].title}`;
  timeTrack.innerHTML = `00:00 / ${playList[0].duration}`;
  volumeLevel.value = audio.volume * 100;
};

createPlayList();

const addPlayListListener = () => {
  const songs = document.querySelectorAll('.play-item');
  songs.forEach((song) => {
    song.addEventListener('click', () => {
      songs.forEach((song) => {
        song.classList.remove('pause-btn');
      });
      song.classList.add('pause-btn');
      const number = parseInt(song.textContent.substring(0, 1) - 1);
      if (currentPlay === number) {
        if (audio.paused) {
          audio.play();
          playBtn.classList.add('pause');
        } else {
          audio.pause();
          playBtn.classList.remove('pause');
          song.classList.remove('pause-btn');
        }
      } else {
        currentPlay = number;
        playBtn.classList.add('pause');
        audio.src = playList[currentPlay].src;
        audioPlayer(isPlay);
      }
    });
  });
};

addPlayListListener();

const changeActiveItem = (activeItem) => {
  const items = document.querySelectorAll('.play-item');
  items.forEach((el) => {
    el.classList.remove('item-active');
    el.style.color = `#fff`;
  });

  items[activeItem].classList.add('item-active');
  items[activeItem].style.color = `#ff8c00`;

  curentTitle.innerHTML = `${activeItem + 1}. ${playList[activeItem].title}`;
  timeTrack.innerHTML = `00:00 / ${playList[activeItem].duration}`;
};

const audioPlayer = (skip) => {
  changeActiveItem(currentPlay);
  const smallButton = document.querySelectorAll('.play-item');
  let count = 0;
  if (audio.paused) {
    playBtn.classList.add('pause');

    audio.play();
    isPlay = true;

    smallButton.forEach((el) => {
      if (count !== currentPlay) {
        el.classList.remove('pause-btn');
      } else {
        el.classList.add('pause-btn');
      }
      count++;
    });
  } else {
    playBtn.classList.remove('pause');
    smallButton.forEach((el) => {
      el.classList.remove('pause-btn');
    });

    audio.pause();

    isPlay = false;
  }
};

const getTime = (time) => {
  const newTime = Math.round(time);
  let sec = (newTime % 60).toString().padStart(2, 0);
  let min = Math.floor(newTime / 60)
    .toString()
    .padStart(2, 0);
  let hours = Math.floor(min / 60)
    .toString()
    .padStart(2, 0);

  return hours !== '00' ? `${hours}:${min}:${sec}` : `${min}:${sec}`;
};

const incPlayNum = () => {
  if (currentPlay !== 3) {
    currentPlay++;
  } else {
    currentPlay = 0;
  }
};

const dicPlayNum = () => {
  if (currentPlay !== 0) {
    currentPlay--;
  } else {
    currentPlay = 3;
  }
};

const playNextTrack = () => {
  incPlayNum();
  audio.src = playList[currentPlay].src;
  audioPlayer(true);
};

const playPrevTrack = () => {
  dicPlayNum();
  audio.src = playList[currentPlay].src;
  audioPlayer(true);
};

const playTrack = () => {
  audioPlayer();
};

playBtn.addEventListener('click', playTrack);

prevBtn.addEventListener('click', playPrevTrack);

nextBtn.addEventListener('click', playNextTrack);

audio.addEventListener('ended', playNextTrack);

setInterval(() => {
  const curentDuration = audio.duration;
  const curentPosition = audio.currentTime;
  let positionProgress = Math.round((curentPosition / curentDuration) * 100);
  progressBarCurrent.style.width = `${positionProgress}%`;
  timeTrack.innerHTML = `${getTime(curentPosition)} / ${playList[currentPlay].duration}`;
}, 500);

progressDuration.addEventListener('click', (value) => {
  const progressWidth = window.getComputedStyle(progressDuration).width;
  const duration = (value.offsetX / parseInt(progressWidth)) * audio.duration;
  audio.currentTime = duration;
});

mute.addEventListener('click', () => {
  if (audio.volume === 0) {
    audio.volume = currentLevelVolume;
    mute.classList.remove('player-volume-mute');
    mute.classList.add('player-volume-unmute');
    volumeLevel.value = currentLevelVolume * 100;
  } else {
    audio.volume = 0;
    mute.classList.add('player-volume-mute');
    mute.classList.remove('player-volume-unmute');
    volumeLevel.value = 0;
  }
});

volumeLevel.addEventListener('change', () => {
  if (volumeLevel.value > 0) {
    mute.classList.remove('player-volume-mute');
    mute.classList.add('player-volume-unmute');
  } else {
    mute.classList.add('player-volume-mute');
    mute.classList.remove('player-volume-unmute');
  }
  audio.volume = volumeLevel.value / 100;
  currentLevelVolume = volumeLevel.value / 100;
});
