function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},a={},r=t.parcelRequirea610;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){a[e]=t},t.parcelRequirea610=r);var n=r("eWCmQ"),s=r("2shzp"),i=r("kEUo3");r("fZKcF");var d=r("krGWQ"),l=r("8xxV0"),f=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});const u={page:1,per_page:40,q:""};async function c(){const t=new URLSearchParams({...u,image_type:"photo",orientation:"horizontal",pretty:!0,key:d.api.KEY});try{const a=await e(s).get(`${d.api.BASE_URL}?${t}`),r=a.data.hits.length,i=a.data.totalHits;if(0===r)return void e(n).Notify.failure("Sorry, there are no images matching your search query. Please try again.");1===u.page&&e(n).Notify.success(`Hooray! We found ${i} images.`),o=a.data.hits,d.refs.gallery.insertAdjacentHTML("beforeend",(0,l.markUpGallery)(o)),f.refresh(),d.refs.buttonLoadMore.classList.remove("is-hidden"),d.refs.outputPagesLoad.textContent=`${(u.page-1)*u.per_page+r} of ${i}`,u.page*u.per_page>=i&&(d.refs.buttonLoadMore.classList.add("is-hidden"),e(n).Notify.warning("We're sorry, but you've reached the end of search results."))}catch(e){console.log(e.response.status)}var o}d.refs.form.addEventListener("submit",(function(e){e.preventDefault(),u.page=1,u.q=e.currentTarget.elements.searchQuery.value,d.refs.gallery.innerHTML="",d.refs.outputPagesLoad.textContent="",d.refs.buttonLoadMore.classList.add("is-hidden"),c()})),d.refs.buttonLoadMore.addEventListener("click",(function(){u.page++,c()})),window.addEventListener("scroll",(0,i.throttle)((function(){const e=d.refs.buttonPageTop.classList.contains("is-hidden"),t=window.scrollY>=3*window.innerHeight;t&e&&d.refs.buttonPageTop.classList.remove("is-hidden");!t&!e&&d.refs.buttonPageTop.classList.add("is-hidden")}),500)),d.refs.buttonPageTop.addEventListener("click",(function(){window.scroll({top:0,behavior:"smooth"})}));
//# sourceMappingURL=task1.a1259f99.js.map