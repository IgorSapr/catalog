// Массив КАТАЛОГА товаров
let catalogArr = [
  {
    title: 'iPhone 14 Pro',
    price: 110000,
    desc: 'Смартфон Apple iPhone 14 Pro 128GB',
    img: 'img/1.jpg',
  },
  {
    title: 'AirPods Pro',
    price: 2100,
    desc: 'Наушники Apple AirPods Pro (2-го поколения, 2022)',
    img: 'img/2.jpg',
  },
  {
    title: 'Чехол iPhone 14 Pro',
    price: 1200,
    desc: 'Чехол для Apple iPhone 14 Pro - желтый',
    img: 'img/3.jpg',
  },
];

// Массив корзины
let basketArr = [];

// Функция, возвращает новую кнопку
function getButton(text, className) {
  let button = document.createElement('button');
  button.classList.add(className);
  button.textContent = text;
  return button;
}

// Функция, возвращающает элемент списка каталога
function getProductCard(card) {
  let cardElement = document.createElement('li');
  let cardImg = document.createElement('img');
  let cardTitle = document.createElement('h2');
  let cardDesc = document.createElement('p');
  let cardPrice = document.createElement('span');

  cardElement.classList.add('card');
  cardImg.classList.add('card__img');
  cardTitle.classList.add('card__title');
  cardDesc.classList.add('card__desc');
  cardPrice.classList.add('card__span');

  cardTitle.textContent = card.title;
  cardImg.src = card.img;
  cardDesc.textContent = card.desc;
  cardPrice.textContent = `${card.price} руб`;

  let cardWrap = getBox('card__wrap');

  let cardBasketBtn = getButton('+ В корзину', 'btn');

  cardBasketBtn.onclick = function () {
    basketArr.push(card);
    renderBasket(basketArr); // Перерисовка списка корзины
  };

  cardWrap.append(cardTitle, cardDesc, cardPrice, cardBasketBtn);
  cardElement.append(cardImg, cardWrap);

  return cardElement;
}

// Функция, возвращающает элемент списка корзины
function getBasketCard(index, card) {
  let cardElement = document.createElement('li');
  let cardImg = document.createElement('img');
  let cardTitle = document.createElement('h2');
  let cardPrice = document.createElement('span');

  cardElement.classList.add('card-basket');
  cardImg.classList.add('card-basket__img');
  cardTitle.classList.add('card-basket__title');
  cardPrice.classList.add('card-basket__span');

  cardTitle.textContent = card.title;
  cardImg.src = card.img;
  cardPrice.textContent = `${card.price} руб`;

  let cardWrap = getBox('card-basket__wrap');

  let removeBtn = getButton('Удалить', 'card-basket__btn');

  removeBtn.onclick = function () {
    basketArr.splice(index, 1);
    renderBasket(basketArr); // Перерисовка списка корзины
  };

  cardWrap.append(cardTitle, cardPrice);
  cardElement.append(cardImg, cardWrap, removeBtn);

  return cardElement;
}

// Функция, возвращающает список
function getList(text) {
  let ul = document.createElement('ul');
  ul.classList.add(text);

  return ul;
}

let catalogList = getList('list');

// Функция отрисовки списка
function renderCatalog(arr) {
  catalogList.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    let newCard = getProductCard(arr[i]);

    catalogList.append(newCard);
  }
}

renderCatalog(catalogArr);

// Функция, возвращающая новый блок
function getBox(className) {
  let div = document.createElement('div');
  div.classList.add(className);
  return div;
}

// Блок контейнера
let container = getBox('container');

// Блок католога
let catalogBox = getBox('catalog-box');

// Заголовок
let title = document.createElement('h1');
title.classList.add('catalog-box__title');
title.textContent = 'Каталог';

catalogBox.append(title, catalogList);

// Блок корзины
let basketBox = getBox('basket-box');

// Блок списка с кнопкой
let basketMenuBox = getBox('basket-box__menu');
basketMenuBox.classList.add('hide');

// Cписок корзины
let basketList = getList('basket-list');

// Кнопка корзины
let basketMenuBtn = getButton('Заказать на сумму:', 'basket-box__menu--btn');
let basketMenuBtnSpan = document.createElement('span');
basketMenuBtnSpan.classList.add('basket-box__menu--btn-span');
basketMenuBtn.onclick = function () {
  alert('Раздел в разработке');
};

basketMenuBtn.append(basketMenuBtnSpan);
basketMenuBox.append(basketList, basketMenuBtn);

// Кнопка показа корзины
let basketBtn = getButton('', 'basket-btn');
let basketBtnImg = document.createElement('img');
basketBtnImg.classList.add('basket-btn__img');
basketBtnImg.src = 'img/basket.svg';

// Показать / скрыть список корзины
basketBtn.onclick = function () {
  if (basketMenuBox.classList.contains('hide') === true) {
    basketBtnImg.src = 'img/close.svg';
    basketMenuBox.classList.remove('hide');
  } else {
    basketBtnImg.src = 'img/basket.svg';
    basketMenuBox.classList.add('hide');
  }
};

basketBtn.append(basketBtnImg);

// Функция отрисовки списка корзины
function renderBasket(arr) {
  basketList.innerHTML = '';

  if (arr.length === 0) {
    let emptyBasketItem = document.createElement('li');
    emptyBasketItem.classList.add('basket-list__item--empty');

    let textBasketItem = document.createElement('p');
    textBasketItem.classList.add('basket-list__text');
    textBasketItem.textContent = 'Товаров в корзине нет';

    emptyBasketItem.append(textBasketItem);
    basketList.append(emptyBasketItem);

    basketMenuBtnSpan.textContent = '0 руб';

    return;
  }

  let allTotalPrice = 0; // Общая цена

  for (let i = 0; i < arr.length; i++) {
    let basketItem = getBasketCard(i, arr[i]);

    allTotalPrice = allTotalPrice + arr[i].price;

    basketList.append(basketItem);
  }

  // Изменяем текст в элементе общей цены
  basketMenuBtnSpan.textContent = `${allTotalPrice} руб`;
}

renderBasket(basketArr);

basketBox.append(basketMenuBox, basketBtn);

container.append(catalogBox, basketBox);

document.body.append(container);
