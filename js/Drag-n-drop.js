'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var addressValueInput = document.getElementById('address');
  var mapContainer = document.querySelector('.map');
  var mapContainerRect = mapContainer.getBoundingClientRect();
  var inputAddressValue = function (el, w, h) {
    addressValueInput.value = (+el.style.left.substr(0, el.style.left.length - 2) + Math.round(w / 2))
      + ', ' + (+el.style.top.substr(0, el.style.top.length - 2) + h);
  };

  inputAddressValue(mainPin, window.Data.WIDTH, window.Data.HEIGHT);
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var Coords = {
      x: evt.pageX,
      y: evt.pageY
    };
    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: Coords.x - moveEvt.pageX,
        y: Coords.y - moveEvt.pageY
      };
      Coords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY,
        pin: mainPin.getBoundingClientRect()
      };
      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (moveEvt.pageX < mapContainerRect.left || mainPinLeft < window.Data.MIN_X) {
        mainPinLeft = window.Data.MIN_X;
      } else if (moveEvt.pageX > mapContainerRect.right || mainPinLeft > window.Data.MAX_X) {
        mainPinLeft = window.Data.MAX_X;
      }
      if (moveEvt.pageY < window.Data.MIN_Y || mainPinTop < window.Data.MIN_Y) {
        mainPinTop = window.Data.MIN_Y;
      } else if (moveEvt.pageY > window.Data.MAX_Y || mainPinTop > window.Data.MAX_Y) {
        mainPinTop = window.Data.MAX_Y;
      }

      mainPin.style.top = mainPinTop + 'px';
      mainPin.style.left = mainPinLeft + 'px';
      inputAddressValue(mainPin, window.Data.WIDTH, window.Data.HEIGHT);
    };
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      mapContainer.classList.remove('map--faded');
      window.utils.disableFilterList(false);
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      if (document.querySelectorAll('.map__pin').length === 1) {
        window.backend.load(window.loader, window.backend.ErrorHandler);
      }
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
