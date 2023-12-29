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

  const getProduct = (title, urlsImage) => {
    getData(`./files/products.json`).then(products => {
      openModal(products.find(product => product.name == title), urlsImage);
    });
  }

  const openModal = (product, urlsImage) => {
    if (!product) return;

    modal.querySelector('.modal__title').textContent = product.name;
    modal.querySelector('.modal__text').textContent = product.description;
    modal.querySelector('.modal__total-value span').textContent = product.price;
    modal.querySelector('.modal__total-value span').dataset.value = product.price;
    modal.querySelector('.modal__image img').src = urlsImage.src;
    modal.querySelectorAll('.modal__image source').forEach(source => {
      source.srcset = urlsImage.srcset;
    });

    for (let size in product.sizes) {
      const fieldset = modal.querySelector('.modal-fieldset_size');
      fieldset.querySelector('input[data-name="size-' + size + '"]').dataset.value = product.sizes[size]['add-price'];
      fieldset.querySelector('label[data-name="size-' + size + '"]').innerHTML = `<span>${size.toLocaleUpperCase()}</span>${product.sizes[size].size}`;

    }

    for (let additive in product.additives) {
      const fieldset = modal.querySelector('.modal-fieldset_additives');
      const key = +additive + 1;
      fieldset.querySelector('input[data-name="additive-' + key + '"]').dataset.value = product.additives[additive]['add-price'];
      fieldset.querySelector('label[data-name="additive-' + key + '"]').innerHTML = `<span>${key.toString().toLocaleUpperCase()}</span>${product.additives[additive].name}`;
    }

    calcTotal();
    modal.classList.remove('hidden');
    document.documentElement.classList.add("lock");
  };

  const closeModal = (e) => {
    if (modal.classList.contains('hidden')) return;

    if (!e.target.closest('.modal__wrapper') || e.target.closest('.modal__btn')) {
      modal.classList.add('hidden')
      document.documentElement.classList.remove("lock");
      inputs.forEach(input => input.checked = input.defaultChecked);
    }
  };

  productCards.forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();

      const card = e.target.closest('.product-card__link');

      if (!card && !modal) return;

      const urlsImage = {
        src: card.querySelector('.product-card__image img').dataset.src,
        srcset: card.querySelector('.product-card__image source') ? card.querySelector('.product-card__image source').dataset.srcset : ''
      };

      getProduct(card.querySelector('.product-card__title').textContent, urlsImage);
    });
  });

  const calcTotal = () => {
    let total = modal.querySelector('.modal__total-value span').dataset.value;

    inputs.forEach(input => total = +total + +(input.checked ? input.dataset.value : 0));

    const totalFormat = new Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(total);

    modal.querySelector('.modal__total-value span').textContent = totalFormat;
  };

  document.addEventListener('click', closeModal);
  inputs.forEach(input => input.addEventListener('change', calcTotal));
}

init();