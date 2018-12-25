'use strict';
(function () {
  var Data = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],

    types: ['palace', 'flat', 'house', 'bungalo'],
    featuresArr: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photosArr: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    checkInsOutsArr: ['12:00', '13:00', '14:00'],
    OBJECTS_QUANTITY: 8,
    objects: [],
    mapWidth: document.querySelector('.map').offsetWidth - document.querySelector('.map__pin').offsetWidth,
    PIN_WIDTH: document.querySelector('.map__pin').offsetWidth,
    PIN_HEIGHT: document.querySelector('.map__pin').offsetHeight,
    MAP_MIN_Y: 130 + document.querySelector('.map__pin').offsetHeight,
    MAP_MAX_Y: 630 - document.querySelector('.map__pin').offsetHeight,
  };
  window.Data = Data;
  for (var i = 0; i < window.Data.OBJECTS_QUANTITY; i++) {
    window.Utils.shuffleArr(window.Data.titles);
    window.Utils.shuffleArr(window.Data.types);
    window.Utils.shuffleArr(window.Data.checkInsOutsArr);
    var mapPinX = window.Utils.getRandomInteger(window.Data.PIN_WIDTH, window.Data.mapWidth);
    var mapPinY = window.Utils.getRandomInteger(window.Data.MAP_MIN_Y, window.Data.MAP_MAX_Y);
    var objectDescripton = {
      'author': {
        'avatar': 'img/avatars/user0' + window.Utils.getRandomInteger(1, 8) + '.png'
      },
      'offer': {
        'title': window.Data.titles[(window.Data.titles.length - 1) - i],
        'address': (mapPinX - Math.round(window.Data.PIN_WIDTH / 2)) + ', ' + (mapPinY - window.Data.PIN_HEIGHT),
        'price': window.Utils.getRandomInteger(1000, 1000000),
        'type': window.Data.types[(window.Utils.getRandomInteger(0, window.Data.types.length - 1))],
        'rooms': window.Utils.getRandomInteger(1, 5),
        'guests': window.Utils.getRandomInteger(1, 10),
        'checkin': window.Data.checkInsOutsArr[(window.Utils.getRandomInteger(0, window.Data.checkInsOutsArr.length - 1))],
        'checkout': window.Data.checkInsOutsArr[(window.Utils.getRandomInteger(0, window.Data.checkInsOutsArr.length - 1))],
        'features': window.Utils.getRandomArr(window.Data.featuresArr, window.Utils.getRandomInteger(1, window.Data.featuresArr.length)),
        'description': '',
        'photos': window.Utils.shuffleArr(window.Data.photosArr)
      },
      'location': {
        'x': mapPinX - Math.round(window.Data.PIN_WIDTH / 2),
        'y': mapPinY - window.Data.PIN_HEIGHT
      }
    };
    window.Data.objects.push(objectDescripton);
  }
})();
