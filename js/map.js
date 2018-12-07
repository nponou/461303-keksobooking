'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var types = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkInsOutsArr = ['12:00', '13:00', '14:00'];
var OBJECTS_QUANTITY = 8;
var objects = [];
// var pins = [];
var mapWidth = document.querySelector('.map').offsetWidth - document.querySelector('.map__pin').offsetWidth;
var PIN_WIDTH = document.querySelector('.map__pin').offsetWidth;
var PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;
var MAP_MIN_Y = 130 + PIN_HEIGHT;
var MAP_MAX_Y = 630;
var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

function shuffleArr(arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function getRandomArr(arr, n) {
  var result = new Array(n);
  var len = arr.length;
  var taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result.sort();
}

for (var i = 0; i < OBJECTS_QUANTITY; i++) {
  shuffleArr(titles);
  shuffleArr(types);
  shuffleArr(checkInsOutsArr);
  var mapPinX = getRandomInteger(PIN_WIDTH, mapWidth);
  var mapPinY = getRandomInteger(MAP_MIN_Y, MAP_MAX_Y);
  var objectDescripton = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
    },
    'offer': {
      'title': titles[(titles.length - 1) - i],
      'address': (mapPinX - Math.round(PIN_WIDTH / 2)) + ', ' + (mapPinY - PIN_HEIGHT),
      'price': getRandomInteger(1000, 1000000),
      'type': types[(getRandomInteger(0, types.length - 1))],
      'rooms': getRandomInteger(1, 5),
      'guests': getRandomInteger(1, 10),
      'checkin': checkInsOutsArr[(getRandomInteger(0, checkInsOutsArr.length - 1))],
      'checkout': checkInsOutsArr[(getRandomInteger(0, checkInsOutsArr.length - 1))],
      'features': getRandomArr(featuresArr, getRandomInteger(1, featuresArr.length)), // тут функция для получения случайного массива из строк
      'description': '',
      'photos': shuffleArr(photosArr)
    },
    'location': {
      'x': mapPinX - Math.round(PIN_WIDTH / 2),
      'y': mapPinY - PIN_HEIGHT
    }
  };
  objects.push(objectDescripton);
}

// document.querySelector('.map').classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');
var pinCloneTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (arrayElement) {
  var pinClone = pinCloneTemplate.cloneNode(true);
  pinClone.style.left = arrayElement.location.x + 'px';
  pinClone.style.top = arrayElement.location.y + 'px';
  pinClone.querySelector('img').src = arrayElement.author.avatar;
  pinClone.querySelector('img').alt = arrayElement.offer.title;
  return pinClone;
};

var fragmentForPins = document.createDocumentFragment();
for (var j = 0; j < OBJECTS_QUANTITY; j++) {
  fragmentForPins.appendChild(renderPin(objects[j]));
}

var typeSelector = function (element) {
  var TypeSelector = {
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  return TypeSelector[element.offer.type] ? TypeSelector[element.offer.type] : 'квартира';
};
// pinsList.appendChild(fragmentForPins);

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderAdvtCard = function (objectData) {
  var cardClone = mapCardTemplate.cloneNode(true);
  cardClone.querySelector('.popup__title').textContent = objectData.offer.title;
  cardClone.querySelector('.popup__text--address').textContent = objectData.offer.address;
  cardClone.querySelector('.popup__text--price').innerHTML = objectData.offer.price + '₽/ночь';
  cardClone.querySelector('.popup__type').textContent = typeSelector(objectData);
  cardClone.querySelector('.popup__text--capacity').innerHTML = objectData.offer.rooms + ' комнаты для ' + objectData.offer.guests + ' гостей';
  cardClone.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + objectData.offer.checkin + ', выезд до ' + objectData.offer.checkout;
  cardClone.querySelector('.popup__description').textContent = '';
  cardClone.querySelector('.popup__features').innerHTML = '';
  for (var featureIndex = 0; featureIndex < objectData.offer.features.length; featureIndex++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + objectData.offer.features[featureIndex];
    cardClone.querySelector('.popup__features').appendChild(featureElement);
  }
  for (var photosQuantity = 0; photosQuantity <= objectData.offer.photos.length - 1; photosQuantity++) {
    var photoClone = cardClone.querySelector('.popup__photo').cloneNode(true);
    photoClone.src = objectData.offer.photos[photosQuantity];
    cardClone.querySelector('.popup__photos').appendChild(photoClone);
  }
  var parentnode = cardClone.querySelector('.popup__photos');
  var childnode = parentnode.children;
  childnode[0].remove();
  cardClone.querySelector('.popup__avatar').src = objectData.author.avatar;
  return cardClone;
};

document.querySelector('.map').appendChild(renderAdvtCard(objects[1]));

var mainPin = document.querySelector('.map__pin--main');

var addressValueX = parseInt((mainPin.style.left), 10);
var addressValueY = parseInt((mainPin.style.top), 10);
var addressValueInput = document.getElementById('address');
addressValueInput.value = addressValueX + ', ' + addressValueY;

mainPin.addEventListener('mouseup', function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  pinsList.appendChild(fragmentForPins);
  // pins = document.querySelectorAll('.map__pin');
  // console.log(pins.length);
});

/* var onPinClick = function (object, card) {
  object.addEventListener('click', function () {
    console.log(object);
    console.log(card);
  });
};

for (var k = 1; k < pins.length; k++) {
  onPinClick(pins[k], adCard[k]);
} */
