const topBtns = document.querySelectorAll('.btn');
const bottomBloks = document.querySelectorAll('.bottom-block');

topBtns.forEach((btn) => {
  btn.addEventListener('click', (element) => {
    const path = element.target.dataset.path;

    bottomBloks.forEach((block) => {
      if (block.dataset.target !== path) {
        block.classList.remove('bottom-block--active');
        block.classList.add('bottom-block--hidden');
      } else {
        block.classList.add('bottom-block--active');
        block.classList.remove('bottom-block--hidden');
      }
    });

    topBtns.forEach((btn) => {
      btn.classList.remove('btn--active');
    });

    btn.classList.add('btn--active');
  });
});
