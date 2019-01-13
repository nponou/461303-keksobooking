'use strict';
(function () {
  var Data = {
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
})();
