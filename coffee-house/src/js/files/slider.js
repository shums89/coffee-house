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