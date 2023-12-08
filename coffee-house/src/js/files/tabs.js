const tabs = (headerSelector, tabSelector, contentSelector, activeClassHeader, activeClassContent) => {
  const header = document.querySelector(headerSelector);

  if (!header) return;

  const tab = header.querySelectorAll(tabSelector);
  const content = header.querySelectorAll(contentSelector);

  const toggleButtonRefresh = (content) => {
    const count = content.querySelectorAll('.products__item').length;
    if (count > 4) {
      document.querySelector('.menu-tabs__refresh').classList.remove('hidden');
    }
    else {
      document.querySelector('.menu-tabs__refresh').classList.add('hidden');
    }
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
    toggleButtonRefresh(content[i]);
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
tabs('.menu-tabs', '.menu-tabs__header-item', '.menu-tabs__content-item', 'active', 'active');