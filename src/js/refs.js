const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  buttonLoadMore: document.querySelector('.load-more'),
  buttonPageTop: document.querySelector('.page-up'),
  outputPagesLoad: document.querySelector('.pages-load'),
};
const api = {
  BASE_URL: 'https://pixabay.com/api/',
  KEY: '28931784-c1efcd868e1c004f8e87ba397',
};
export { refs, api };
