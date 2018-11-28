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
var mapWidth = document.querySelector('.map').offsetWidth;
var MAP_MIN_Y = 130;
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
  shuffleArr(types);
  shuffleArr(checkInsOutsArr);
  var mapPinX = getRandomInteger(0, mapWidth);
  var mapPinY = getRandomInteger(MAP_MIN_Y, MAP_MAX_Y);
  var objectDescripton = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInteger(0, 8) + '.png'
    },
    'offer': {
      'title': titles[(titles.length - 1) - i],
      'address': mapPinX + ', ' + mapPinY,
      'price': getRandomInteger(1000, 1000000),
      'type': types[(getRandomInteger(0, types.length - 1))],
      'rooms': getRandomInteger(1, 5),
      'guests': getRandomInteger(1, 10),
      'checkin': checkInsOutsArr[(getRandomInteger(0, checkInsOutsArr.length - 1))],
      'checkout': checkInsOutsArr[(getRandomInteger(0, checkInsOutsArr.length - 1))],
      'features': getRandomArr(featuresArr, getRandomInteger(1, featuresArr.length)), // тут функция для получения случайного массива из строк
      'description': '',
      'photos': shuffleArr(photosArr),
    },
    'location': {
      'x': mapPinX,
      'y': mapPinY
    }
  };
  objects.push(objectDescripton);
}

console.log(objectDescripton.location.x);

document.querySelector('.map').classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');
var pinCloneTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (objectArray) {
  var pinClone = pinCloneTemplate.cloneNode(true);
  pinClone.style = 'left: ' + String(objectArray.location.x) + 'px; top: ' + String(objectArray.location.y) + 'px;';
  pinClone.querySelector('img').src = objectArray.author.avatar;
  pinClone.querySelector('img').alt = objectArray.offer.title;
  return pinClone;
};

var pinFragment = document.createDocumentFragment();
for (var j = 0; j < OBJECTS_QUANTITY; j++) {
  pinFragment.appendChild(renderPin(objectDescripton[i]));
}

pinsList.appendChild(pinFragment);
