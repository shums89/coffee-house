export const toggleButtonRefresh = () => {
  const products = document.querySelector('.menu-content-item._active').querySelectorAll('.products__item');
  const count = [...products].filter(product => getComputedStyle(product).display == 'none').length || 0;

  count > 0 ?
    document.querySelector('.menu-tabs__refresh').classList.remove('hidden') :
    document.querySelector('.menu-tabs__refresh').classList.add('hidden');
};

const tabs = (headerSelector, tabSelector, contentSelector, activeClassHeader, activeClassContent) => {
  const header = document.querySelector(headerSelector);

  if (!header) return;

  const tab = header.querySelectorAll(tabSelector);
  const content = header.querySelectorAll(contentSelector);

  const resetContent = (content) => {
    const products = content.querySelectorAll('.products__item');

    products.forEach(product => product.style = '');
  };

  const hideTabContent = () => {
    content.forEach(item => {
      item.classList.remove(activeClassContent);
    });
    tab.forEach(item => {
      item.classList.remove(activeClassHeader)
    });
  };

  const showTabContent = (i = 0) => {
    content[i].classList.add(activeClassContent);
    tab[i].classList.add(activeClassHeader)
    resetContent(content[i]);
    toggleButtonRefresh();
  };

  hideTabContent()
  showTabContent()

  header.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  })
};

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
// ПЯТЫЙ аргумент - класс активности, который будет добавлятся для контента, который сейчас активен.
tabs('.menu-tabs', '.menu-tabs__header-item', '.menu-tabs__content-item', '_active', '_active');