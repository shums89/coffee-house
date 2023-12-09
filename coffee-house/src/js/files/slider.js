const initFavoriteSlider = () => {
  const slider = document.querySelector('.favorite-slider');

  if (!slider) return;

  const sliderWrapper = slider.querySelector('.favorite-slider__wrapper');
  const sliderList = slider.querySelector('.favorite-slider__swiper');
  const sliderItems = sliderList.querySelectorAll('.favorite-slider__slide');
  const sliderPaginations = slider.querySelectorAll('.favorite-slider__pagination > span');
  const btnPrev = slider.querySelector('.favorite-slider__nav-button_prev');
  const btnNext = slider.querySelector('.favorite-slider__nav-button_next');
  let currentSlide = 0;
  const PosX = {
    init: 0,
    current: 0,
    min: 0,
    max: 0,
  };
  let PosYInit = 0;

  const changeSlide = (slide = '') => {
    const slideWidth = +getComputedStyle(sliderItems[0]).width.replace('px', '') + +getComputedStyle(sliderList).gap.replace('px', '');
    const countSlides = sliderItems.length;

    sliderItems[currentSlide].removeEventListener('touchmove', move);
    sliderItems[currentSlide].removeEventListener('mouseleave', move);
    sliderItems[currentSlide].removeEventListener('touchend', endListener);
    sliderItems[currentSlide].removeEventListener('mouseup', endListener);

    sliderPaginations.forEach((pagination, index) => {
      if (pagination.closest('._active')) {
        currentSlide = index;
      }
    });

    switch (slide) {
      case 'prev':
        currentSlide === 0 ? currentSlide = countSlides - 1 : currentSlide--;
        break;
      case 'next':
        currentSlide === countSlides - 1 ? currentSlide = 0 : currentSlide++;
    }

    sliderPaginations.forEach((pagination, index) => {
      pagination.classList.remove('_active');
      pagination.classList.remove('_paused');

      if (index === currentSlide) {
        pagination.classList.add('_active');
      }
    });

    sliderList.style.transition = "all 1s ease 0s";
    sliderList.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    PosX.init = 0;
    PosX.current = 0;

    sliderItems[currentSlide].addEventListener('touchstart', startListener);
    sliderItems[currentSlide].addEventListener('mousedown', startListener);
  };

  const setPaused = () => {
    slider.querySelector('span._active').classList.add('_paused');
  };

  const deletePaused = () => {
    slider.querySelector('span._active').classList.remove('_paused');
  };

  const startListener = (e) => {
    e.preventDefault();
    setPaused();

    const coords = sliderWrapper.getBoundingClientRect();

    PosX.init = e.clientX || e.changedTouches[0].clientX;
    PosYInit = e.clientY || e.changedTouches[0].clientY;
    PosX.min = coords.left;
    PosX.max = coords.right;

    sliderItems[currentSlide].addEventListener('touchmove', move);
    sliderItems[currentSlide].addEventListener('mouseleave', move);
    sliderItems[currentSlide].addEventListener('touchend', endListener);
    sliderItems[currentSlide].addEventListener('mouseup', endListener);
  };

  const endListener = (e) => {
    e.preventDefault();
    deletePaused();

    PosX.current = e.clientX || e.changedTouches[0].clientX;

    if (Math.abs(PosX.current - PosX.init) > 20) {
      if (PosX.current > PosX.init) {
        changeSlide('prev');
      } else {
        changeSlide('next');
      }
    } else {
      changeSlide();
    }
  };

  const move = (e) => {
    PosX.current = e.clientX || e.changedTouches[0].clientX;

    window.scrollBy(0, PosYInit - (e.clientY || e.changedTouches[0].clientY));

    if (PosX.current > PosX.max) {
      changeSlide('prev');
    } else if (PosX.current < PosX.min) {
      changeSlide('next');
    }
  };

  btnPrev.addEventListener('click', () => changeSlide('prev'));
  btnNext.addEventListener('click', () => changeSlide('next'));

  sliderPaginations.forEach(pagination => {
    pagination.addEventListener('animationend', () => changeSlide('next'));
  });

  sliderItems.forEach(slide => {
    slide.addEventListener('click', e => e.preventDefault());
    slide.addEventListener('mouseenter', setPaused);
    slide.addEventListener('mouseleave', deletePaused);
  });

  changeSlide();
}

initFavoriteSlider();