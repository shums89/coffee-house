import { toggleButtonRefresh } from './tabs.js';

const products = () => {
  const tabs = document.querySelector('.menu-tabs');
  const btnRefresh = tabs.querySelector('.menu-tabs__refresh');

  btnRefresh.addEventListener('click', e => {
    e.preventDefault();

    const products = tabs.querySelectorAll('._active .products__item');

    products.forEach(product => {
      product.style.display = 'block';
    });
    btnRefresh.classList.add('hidden');
  });

  window.addEventListener('resize', () => {
    const products = tabs.querySelectorAll('.products__item');

    products.forEach(product => product.style = '');
    toggleButtonRefresh();
  });
};

products();