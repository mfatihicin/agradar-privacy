const supportedLanguages = ['tr', 'en'];
const storageKey = 'agradar-site-language';

function readSavedLanguage() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

const browserLanguage = navigator.language.toLowerCase().startsWith('tr')
  ? 'tr'
  : 'en';
// ?lang=tr / ?lang=en ile mağaza ve uygulama bağlantıları dili sabitleyebilir
const queryLanguage = new URLSearchParams(location.search).get('lang');

function setLanguage(language) {
  const nextLanguage = supportedLanguages.includes(language) ? language : 'en';
  document.documentElement.lang = nextLanguage;
  document.body.dataset.language = nextLanguage;
  try {
    localStorage.setItem(storageKey, nextLanguage);
  } catch {}

  document.querySelectorAll('[data-language-button]').forEach(button => {
    const selected = button.dataset.languageButton === nextLanguage;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  document.title =
    document.body.dataset[`title${nextLanguage.toUpperCase()}`] ??
    document.title;
}

document.querySelectorAll('[data-language-button]').forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.languageButton);
  });
});

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

setLanguage(queryLanguage || readSavedLanguage() || browserLanguage);
