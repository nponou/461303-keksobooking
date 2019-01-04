'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var addressValueX = parseInt((mainPin.style.left), 10) + Math.round(window.Data.PIN_WIDTH / 2);
  var addressValueY = parseInt((mainPin.style.top), 10) + window.Data.PIN_HEIGHT;
  var addressValueInput = document.getElementById('address');
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
      } else if (Coords.x + window.Data.PIN_WIDTH - shift.X > Map.left + Map.width) {
        left = Map.width - window.Data.PIN_WIDTH + shift.X;
      }
      if (Coords.y + window.Data.PIN_HEIGHT - shift.Y < window.Data.MAP_MIN_Y) {
        top = window.Data.MAP_MIN_Y - window.Data.PIN_HEIGHT + shift.Y;
      } else if (Coords.y - shift.Y > window.Data.MAP_MAX_Y) {
        top = window.Data.MAP_MAX_Y + shift.Y;
      }
      mainPin.style.left = left - shift.X + 'px';
      mainPin.style.top = top - shift.Y + 'px';
      addressValueX = left + parseInt(window.Data.PIN_WIDTH / 2, 10);
      addressValueY = top + window.Data.PIN_HEIGHT;
    };
    var mouseUpHandler = function (upEvt) {
      var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
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
})();
