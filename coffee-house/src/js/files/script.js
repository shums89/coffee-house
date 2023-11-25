window.addEventListener('load', () => {
  const lazyObjs = document.querySelectorAll('[data-src], [data-srcset], [data-poster]');

  const updateLazyObject = arr => {
    arr.forEach(el => {
      if (el.dataset.src) {
        el.src = el.dataset.src;
      }
      if (el.dataset.srcset) {
        el.srcset = el.dataset.srcset;
      }
      if (el.dataset.poster) {
        el.poster = el.dataset.poster;
      }
    });
  };

  if (lazyObjs) {
    updateLazyObject(lazyObjs);
  }
});

//====================================================================

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});

//====================================================================

const initfavoriteSlider = () => {
  const favoriteSlider = document.querySelector('.favorite-slider');

  if (!favoriteSlider) return;

  const favoriteSliderList = favoriteSlider.querySelector('.favorite-slider__swiper');
  const favoriteSliderItems = favoriteSliderList.querySelectorAll('.favorite-slider__slide');
  const favoriteSliderPagination = favoriteSlider.querySelector('.favorite-slider__pagination');
  const favoriteSliderNavButtons = favoriteSlider.querySelectorAll('.favorite-slider__nav-button');

  const changeSlide = (e) => {
    const favoriteSliderPaginations = favoriteSliderPagination.querySelectorAll('*');
    const slideWidth = +getComputedStyle(favoriteSliderItems[0]).width.replace('px', '') + +getComputedStyle(favoriteSliderList).gap.replace('px', '');
    const countSlides = favoriteSliderPaginations.length;
    let currentSlide = 0;
    let target = e ? e.target : null;

    favoriteSliderPaginations.forEach((element, index) => {
      if (element.closest('._active')) {
        currentSlide = index;
      }
    });

    if (target) {
      if ((target.closest('.favorite-slider__nav-button_prev') && currentSlide === 0)
        || (target.closest('.favorite-slider__nav-button_next') && currentSlide === countSlides - 1)
      ) {
        return;
      }

      if (target.closest('.favorite-slider__nav-button_prev')) {
        currentSlide--;
      } else if (target.closest('.favorite-slider__nav-button_next')) {
        currentSlide++;
      }
    }

    favoriteSliderPaginations.forEach((element, index) => {
      element.classList.remove('_active');

      if (index === currentSlide) {
        element.classList.add('_active');
      }
    });

    favoriteSliderList.style.transition = "all 1s ease 0s";
    favoriteSliderList.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    favoriteSlider.querySelector('.favorite-slider__nav-button_prev').disabled = (currentSlide === 0);
    favoriteSlider.querySelector('.favorite-slider__nav-button_next').disabled = (currentSlide === countSlides - 1);
  };

  const favoriteSliderFunction = () => {
    favoriteSliderNavButtons.forEach(element => {
      element.addEventListener('click', changeSlide);
    });
  };

  favoriteSliderFunction();
  changeSlide();
}

initfavoriteSlider();