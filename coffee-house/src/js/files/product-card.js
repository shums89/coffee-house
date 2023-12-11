const init = () => {
  if (!document.querySelector('.html-menu')) return;

  const modal = document.querySelector('.modal');
  const inputs = modal.querySelectorAll('input');
  const productCards = document.querySelectorAll('.product-card__link');

  const getData = async function (url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка по адресу "${url}", статус ошибки ${response.status}!`);
    }

    return await response.json();
  };

  const getProduct = (title, urlImage) => {
    getData(`./files/products.json`).then(products => {
      openModal(products.find(product => product.name == title), urlImage);
    });
  }

  const openModal = (product, urlImage) => {
    if (!product) return;
    console.log(urlImage);

    modal.querySelector('.modal__title').textContent = product.name;
    modal.querySelector('.modal__text').textContent = product.description;
    modal.querySelector('.modal__total-value span').textContent = product.price;
    modal.querySelector('.modal__total-value span').dataset.value = product.price;
    modal.querySelector('.modal__image img').src = urlImage;

    calcTotal();
    modal.classList.remove('hidden');
    document.documentElement.classList.add("lock");
  };

  const closeModal = (e) => {
    if (!e.target.closest('.modal__wrapper') || e.target.closest('.modal__btn')) {
      modal.classList.add('hidden')
      document.documentElement.classList.remove("lock");
      inputs.forEach(input => input.checked = input.defaultChecked);
    }
  };

  productCards.forEach(card => {
    card.addEventListener('click', e => {
      const card = e.target.closest('.product-card__link');

      if (!card && !modal) return;

      getProduct(card.querySelector('.product-card__title').textContent, card.querySelector('.product-card__image img').dataset.src);
    });
  });

  const calcTotal = () => {
    let total = modal.querySelector('.modal__total-value span').dataset.value;

    inputs.forEach(input => total = +total + +(input.checked ? input.dataset.value : 0));

    const totalFormat = new Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(total);

    modal.querySelector('.modal__total-value span').textContent = totalFormat;
  };

  modal.addEventListener('click', closeModal);
  inputs.forEach(input => input.addEventListener('change', calcTotal));
}

init();