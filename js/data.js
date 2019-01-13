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
    WIDTH: 60,
    HEIGHT: 80,
    MIN_X: -30,
    MIN_Y: 50,
    MAX_X: 1170,
    MAX_Y: 550
  };
  window.Data = Data;
  for (var i = 0; i < window.Data.OBJECTS_QUANTITY; i++) {
    window.utils.shuffleArr(window.Data.titles);
    window.utils.shuffleArr(window.Data.types);
    window.utils.shuffleArr(window.Data.checkInsOutsArr);
    var mapPinX = window.utils.getRandomInteger(window.Data.PIN_WIDTH, window.Data.mapWidth);
    var mapPinY = window.utils.getRandomInteger(window.Data.MAP_MIN_Y, window.Data.MAP_MAX_Y);
    var objectDescripton = {
      'author': {
        'avatar': 'img/avatars/user0' + window.utils.getRandomInteger(1, 8) + '.png'
      },
      'offer': {
        'title': window.Data.titles[(window.Data.titles.length - 1) - i],
        'address': (mapPinX - Math.round(window.Data.PIN_WIDTH / 2)) + ', ' + (mapPinY - window.Data.PIN_HEIGHT),
        'price': window.utils.getRandomInteger(1000, 1000000),
        'type': window.Data.types[(window.utils.getRandomInteger(0, window.Data.types.length - 1))],
        'rooms': window.utils.getRandomInteger(1, 5),
        'guests': window.utils.getRandomInteger(1, 10),
        'checkin': window.Data.checkInsOutsArr[(window.utils.getRandomInteger(0, window.Data.checkInsOutsArr.length - 1))],
        'checkout': window.Data.checkInsOutsArr[(window.utils.getRandomInteger(0, window.Data.checkInsOutsArr.length - 1))],
        'features': window.utils.getRandomArr(window.Data.featuresArr, window.utils.getRandomInteger(1, window.Data.featuresArr.length)),
        'description': '',
        'photos': window.utils.shuffleArr(window.Data.photosArr)
      },
      'location': {
        'x': mapPinX - Math.round(window.Data.PIN_WIDTH / 2),
        'y': mapPinY - window.Data.PIN_HEIGHT
      }
    };
    window.Data.objects.push(objectDescripton);
  }
})();
