let defaultLanguages = 'english';

export function getLocalStorage() {
  if (localStorage.getItem('defaultLanguage')) {
    defaultLanguages = localStorage.getItem('defaultLanguage');
  }
}

export async function showEnQuote() {
  const quotes = '../momentum/assets/quotes/quotesEn.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const random = data[Math.floor(Math.random() * data.length)];

  const author = document.querySelector('.author');
  const quote = document.querySelector('.quote');

  author.innerHTML = random.author;
  quote.innerHTML = `"${random.text}"`;
}

export async function showRuQuote() {
  const quotes = '../momentum/assets/quotes/quotesRu.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const random = data[Math.floor(Math.random() * data.length)];

  const author = document.querySelector('.author');
  const quote = document.querySelector('.quote');

  author.innerHTML = random.author;
  quote.innerHTML = `"${random.text}"`;
}

export const showQoute = () => {
  getLocalStorage();

  if (defaultLanguages === 'english') {
    showEnQuote();
  } else {
    showRuQuote();
  }
};

const quoteBtn = document.querySelector('.change-quote');
quoteBtn.addEventListener('click', showQoute);

showQoute();
