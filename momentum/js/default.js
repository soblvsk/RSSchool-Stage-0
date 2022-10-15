export function getDefaultLanguages() {
  if (localStorage.getItem('defaultLanguage')) {
    return localStorage.getItem('defaultLanguage');
  }
  return 'english';
}
