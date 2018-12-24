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
var mapWidth = document.querySelector('.map').offsetWidth - document.querySelector('.map__pin').offsetWidth;
var PIN_WIDTH = document.querySelector('.map__pin').offsetWidth;
var PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;
var MAP_MIN_Y = 130 + PIN_HEIGHT;
var MAP_MAX_Y = 630 - PIN_HEIGHT;
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
      'features': getRandomArr(featuresArr, getRandomInteger(1, featuresArr.length)),
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

var pinsContainer = document.querySelector('.map__pins');
var pinCloneTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (arrayElement) {
  var pinClone = pinCloneTemplate.cloneNode(true);
  pinClone.style.left = arrayElement.location.x + 'px';
  pinClone.style.top = arrayElement.location.y + 'px';
  pinClone.querySelector('img').src = arrayElement.author.avatar;
  pinClone.querySelector('img').alt = arrayElement.offer.title;
  pinClone.querySelector('img').style.pointerEvents = 'none';
  pinClone.classList.add('hidden');
  return pinClone;
};

var fragmentForPins = document.createDocumentFragment();
for (var j = 0; j < OBJECTS_QUANTITY; j++) {
  fragmentForPins.appendChild(renderPin(objects[j]));
}
pinsContainer.appendChild(fragmentForPins);
var typeSelector = function (element) {
  var TypeSelector = {
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  return TypeSelector[element.offer.type] ? TypeSelector[element.offer.type] : 'квартира';
};

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
  cardClone.classList.add('hidden');
  return cardClone;
};
var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var mainPin = document.querySelector('.map__pin--main');
var addressValueX = parseInt((mainPin.style.left), 10) + Math.round(PIN_WIDTH / 2);
var addressValueY = parseInt((mainPin.style.top), 10) + PIN_HEIGHT;
var addressValueInput = document.getElementById('address');
var filtersContainer = document.querySelector('.map__filters-container');
var mapContainer = document.querySelector('.map');
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
  var shift = {
    X: evt.pageX - getCoords(mainPin).left,
    Y: evt.pageY - getCoords(mainPin).top
  };

  var Map = {
    left: mapContainer.offsetLeft,
    width: mapContainer.offsetWidth
  };
  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var Coords = {
      x: moveEvt.pageX,
      y: moveEvt.pageY,
      pin: mainPin.getBoundingClientRect()
    };
    var left = Coords.x - Map.left;
    var top = Coords.y;
    if (Coords.x - Map.left - shift.X < 0) {
      left = shift.X;
    } else if (Coords.x + PIN_WIDTH - shift.X > Map.left + Map.width) {
      left = Map.width - PIN_WIDTH + shift.X;
    }
    if (Coords.y + PIN_HEIGHT - shift.Y < MAP_MIN_Y) {
      top = MAP_MIN_Y - PIN_HEIGHT + shift.Y;
    } else if (Coords.y - shift.Y > MAP_MAX_Y) {
      top = MAP_MAX_Y + shift.Y;
    }
    mainPin.style.left = left - shift.X + 'px';
    mainPin.style.top = top - shift.Y + 'px';
    addressValueX = left + parseInt(PIN_WIDTH / 2, 10);
    addressValueY = top + PIN_HEIGHT;
  };
  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);
    mapContainer.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    addressValueInput.value = addressValueX + ', ' + addressValueY;
    for (var z = 0; z < pinsList.length; z++) {
      pinsList[z].classList.remove('hidden');
    }
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

for (var k = 0; k < objects.length; k++) {
  mapContainer.insertBefore(renderAdvtCard(objects[k]), filtersContainer);
}
var popupsList = document.querySelectorAll('.popup');
var closeButtons = document.querySelectorAll('.popup__close');

var checkActivePopup = function () {
  var openedPopup = document.querySelector('.popup.active');
  if (openedPopup) {
    openedPopup.classList.add('hidden');
    openedPopup.classList.remove('active');
  }
};

function popupCloseHandler(btn) {
  btn.classList.add('hidden');
}

function mapClickHandler(target, advPopup, closeBtn) {
  target.addEventListener('click', function () {
    checkActivePopup();
    advPopup.classList.add('active');
    advPopup.classList.remove('hidden');
  });
  closeBtn.addEventListener('click', function () {
    if (closeBtn.parentNode === advPopup) {
      popupCloseHandler(advPopup);
    }
  });
}

for (var a = 0; a < pinsList.length; a++) {
  mapClickHandler(pinsList[a], popupsList[a], closeButtons[a]);
}

var roomsCount = document.getElementById('room_number');
var guestsCount = document.getElementById('capacity');

roomsCount.addEventListener('change', function () {
  switch (roomsCount.options[roomsCount.selectedIndex]) {
    case roomsCount.options[0] :
      guestsCount.options[0].setAttribute('disabled', 'disabled');
      guestsCount.options[1].setAttribute('disabled', 'disabled');
      guestsCount.options[2].removeAttribute('disabled');
      guestsCount.options[3].setAttribute('disabled', 'disabled');
      guestsCount.options[2].selected = true;
      break;
    case roomsCount.options[1] :
      guestsCount.options[0].setAttribute('disabled', 'disabled');
      guestsCount.options[1].removeAttribute('disabled');
      guestsCount.options[1].selected = true;
      guestsCount.options[2].removeAttribute('disabled');
      guestsCount.options[3].setAttribute('disabled', 'disabled');
      break;
    case roomsCount.options[2] :
      guestsCount.options[0].removeAttribute('disabled');
      guestsCount.options[0].selected = true;
      guestsCount.options[1].removeAttribute('disabled');
      guestsCount.options[2].removeAttribute('disabled');
      guestsCount.options[3].setAttribute('disabled', 'disabled');
      break;
    case roomsCount.options[3] :
      guestsCount.options[0].setAttribute('disabled', 'disabled');
      guestsCount.options[1].setAttribute('disabled', 'disabled');
      guestsCount.options[2].setAttribute('disabled', 'disabled');
      guestsCount.options[3].removeAttribute('disabled');
      guestsCount.options[3].selected = true;
      break;
  }
});

var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

timeIn.addEventListener('change', function () {
  switch (timeIn.options[timeIn.selectedIndex]) {
    case timeIn.options[0] :
      timeOut.options[0].selected = true;
      break;
    case timeIn.options[1] :
      timeOut.options[1].selected = true;
      break;
    case timeIn.options[2] :
      timeOut.options[2].selected = true;
      break;
  }
});


var typePrice = document.getElementById('price');
var typesSelector = document.getElementById('type');

typesSelector.addEventListener('change', function () {
  switch (typesSelector.options[typesSelector.selectedIndex].value) {
    case 'bungalo' :
      typePrice.placeholder = '0';
      typePrice.setAttribute('min', '0');
      break;
    case 'flat' :
      typePrice.placeholder = '1000';
      typePrice.setAttribute('min', '1000');
      break;
    case 'house' :
      typePrice.placeholder = '5000';
      typePrice.setAttribute('min', '5000');
      break;
    case 'palace' :
      typePrice.placeholder = '10000';
      typePrice.setAttribute('min', '10000');
      break;
  }
});
