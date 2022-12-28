console.log('Travel#1: 110 баллов\nTravel#2: 85 баллов\nTravel#3: 125 баллов');


document.addEventListener('DOMContentLoaded', () => {
  const l = document.querySelector('.js-header');

  l.querySelector('.button__hamburger').addEventListener('click', () => {
    l.classList.contains('show-menu'), l.classList.toggle('show-menu');
  });

  l.querySelector('.header-close').addEventListener('click', () => {
    l.classList.remove('show-menu');
  });

  l.querySelector('.header-menu__list').addEventListener('click', () => {
    l.classList.remove('show-menu');
  });

  window.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.header-menu') && !target.closest('.button__hamburger')) {
      l.classList.remove('show-menu');
    }
  });

  const b = document.querySelector('.js-body');
  const popup = document.querySelector('.popup');
  const title = document.querySelector('.popup-title');
  const button = document.querySelector('.form__button');
  const propContent = document.querySelector('.popup-signup__content');
  const propLink = document.querySelector('.popup-signup__link');
  const email = document.querySelector('.popup [type="email"]');
  const password = document.querySelector('.popup [type="password"]');

  function ChangePopup() {
    if (Array.from(popup.classList).includes('registration')) {
      (title.textContent = 'Create account'),
        (button.textContent = 'Sign Up'),
        (propContent.textContent = 'Already have an account?'),
        (propLink.textContent = 'Log in');
    } else {
      (title.textContent = 'Log in to your account'),
        (button.textContent = 'Sign In'),
        (propContent.textContent = 'Don’t have an account?'),
        (propLink.textContent = 'Register');
    }
  }

  b.querySelector('.form__button').addEventListener('click', () => {
    alert(`E-mail: ${email.value}\nPassword: ${password.value}`);
    document.body.style.overflow = 'auto';
  });

  b.querySelector('.close__item').addEventListener('click', () => {
    b.classList.contains('show-popup'),
      b.classList.toggle('show-popup'),
      (document.body.style.overflow = 'hidden');
    ChangePopup();
  });

  b.querySelector('.btn-header').addEventListener('click', () => {
    b.classList.contains('show-popup'),
      b.classList.toggle('show-popup'),
      (document.body.style.overflow = 'hidden');
    ChangePopup();
  });

  b.querySelector('.background').addEventListener('click', () => {
    b.classList.remove('show-popup'),
      popup.classList.remove('registration'),
      (document.body.style.overflow = 'auto');
  });

  b.querySelector('.popup-signup__link').addEventListener('click', () => {
    if (Array.from(popup.classList).includes('registration')) {
      popup.classList.remove('registration');
    } else {
      popup.classList.add('registration');
    }
  });

  propLink.addEventListener('click', () => {
    ChangePopup();
  });

  const dots = document.querySelectorAll('.dot');
  const next = document.querySelector('.slider-arrow__next');
  const prev = document.querySelector('.slider-arrow__prev');
  const slideWindow = document.querySelector('.slider-inner');
  const slides = document.querySelectorAll('.destination-item');
  const slide = document.querySelector('.destination-item');

  let offset = 0;

  function sliderMove(offset, index) {
    slideWindow.style.left = -offset + 'px';
    dots.forEach((el) => el.classList.remove('dot--current'));
    dots[index].classList.add('dot--current');
  }

  document.addEventListener('resize', () => {
    if (slide.clientWidth + slide.clientWidth * 0.045 * (index - 1) < 0) {
      slideWindow.style.left = -376.2 + 'px';
    }
  });

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      slides.forEach((slide) => {
        offset = (slide.clientWidth + slide.clientWidth * 0.045) * (index - 1);
      });
      sliderMove(offset, index);
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      slides.forEach((slide) => {
        offset = (slide.clientWidth + slide.clientWidth * 0.045) * (index - 1);
      });
      sliderMove(offset, index);
    });
  });

  next.addEventListener('click', () => {
    offset += slide.clientWidth + slide.clientWidth * 0.045;
    if (offset > slide.clientWidth + slide.clientWidth * 0.045) {
      offset = -(slide.clientWidth + slide.clientWidth * 0.045);
    }
    dots.forEach((dot, ind) => {
      if (dot.classList.contains('dot--current')) {
        ind === 2 ? (index = 0) : (index = ind + 1);
      }
    });
    sliderMove(offset, index);
  });

  prev.addEventListener('click', () => {
    offset -= slide.clientWidth + slide.clientWidth * 0.045;
    if (offset < -(slide.clientWidth + slide.clientWidth * 0.045)) {
      offset = slide.clientWidth + slide.clientWidth * 0.045;
    }
    dots.forEach((dot, ind) => {
      if (dot.classList.contains('dot--current')) {
        ind === 0 ? (index = 2) : (index = ind - 1);
      }
    });
    sliderMove(offset, index);
  });
});
