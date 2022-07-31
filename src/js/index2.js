// імпортуємо бібліотеки
import '../css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import { throttle } from 'lodash';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs, api } from './refs'; //імпортую об"єкт елементів refs і дані api ключ і базовий url
import { markUpGallery } from './markup_gallery'; //імпортую об"єкт для побудови галереї з завантажених даних

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
//Параметри для пагінації
const params = {
  page: 1,
  per_page: 40,
  q: '',
};
let timerInterval = 0;
const TENDA_SCROLL = 1.3; //коефіцієнт спрацювання підгрузки елементів галереї, від висоти екрана
// Події
refs.form.addEventListener('submit', onSubmitForm);
// refs.buttonLoadMore.addEventListener('click', onClickButtonLoadMore);
window.addEventListener('scroll', throttle(onScroll, 500));
refs.buttonPageTop.addEventListener('click', onClickButtonPageTop);

// функція безперервного скрола
function infiniteScroll() {
  const heightWindow = window.innerHeight;
  const positionY = window.scrollY;
  const maxY = refs.gallery.clientHeight;
  if (maxY - positionY < TENDA_SCROLL * heightWindow) {
    onClickButtonLoadMore();
  }
}
// функція-колбек події сабміта +
function onSubmitForm(e) {
  e.preventDefault();
  if (timerInterval !== 0) {
    console.log('перевірка чи треба');
    clearInterval(timerInterval);
  }

  params.page = 1;
  params.q = e.currentTarget.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  refs.outputPagesLoad.textContent = '';
  fetchData();
  timerInterval = setInterval(infiniteScroll, 400);
}
// функція-колбек для події на кнопці "load-more"+
function onClickButtonLoadMore() {
  params.page++;
  fetchData();
}
// функція-колбек для події на клік на кнопці прокрутки на верх сторінки +
function onClickButtonPageTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
// функція-колбек на подію скрол, добавляє чи ховає кнопку, щоб перейти на початок сторінки+
function onScroll() {
  const isHidden = refs.buttonPageTop.classList.contains('is-hidden');
  const isVisible = window.scrollY >= window.innerHeight * 3;
  if (isVisible & isHidden) {
    refs.buttonPageTop.classList.remove('is-hidden');
  }
  if (!isVisible & !isHidden) {
    refs.buttonPageTop.classList.add('is-hidden');
  }
}
// функція для рендеру галереї +
function renderGallery(users) {
  refs.gallery.insertAdjacentHTML('beforeend', markUpGallery(users));
}
// fetch
async function fetchData() {
  const parametrs = new URLSearchParams({
    ...params,
    image_type: 'photo',
    orientation: 'horizontal',
    pretty: true,
    key: api.KEY,
  });
  try {
    const response = await axios.get(`${api.BASE_URL}?${parametrs}`);
    const loadHits = response.data.hits.length;
    const totalHits = response.data.totalHits;
    // перевірка коли нічого не знаходить при першому запиті від користувача
    if ((loadHits === 0) & (params.page === 1)) {
      clearInterval(timerInterval);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    // виводить кількість знайдених елементів при кліку на пошук
    if (params.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    renderGallery(response.data.hits);
    lightbox.refresh();

    refs.outputPagesLoad.textContent = `${
      (params.page - 1) * params.per_page + loadHits
    } of ${totalHits}`;
    // перевірка коли завантажили максимальну кількість елементів
    if (params.page * params.per_page >= totalHits) {
      console.log('треба виключити інтервал');
      clearInterval(timerInterval);
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
}
