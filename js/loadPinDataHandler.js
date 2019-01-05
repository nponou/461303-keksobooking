'use strict';
(function () {
  var loadPinDataHandler = function () {
    var pinsContainer = document.querySelector('.map__pins');
    var pinCloneTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var renderPin = function (arrayElement) {
      var pinClone = pinCloneTemplate.cloneNode(true);
      pinClone.style.left = arrayElement.location.x + 'px';
      pinClone.style.top = arrayElement.location.y + 'px';
      pinClone.querySelector('img').src = arrayElement.author.avatar;
      pinClone.querySelector('img').alt = arrayElement.offer.title;
      pinClone.querySelector('img').style.pointerEvents = 'none';
      return pinClone;
    };
    var successLoadHandler = function (objectData) {
      var fragmentForPins = document.createDocumentFragment();
      for (var j = 0; j < objectData.length; j++) {
        fragmentForPins.appendChild(renderPin(objectData[j]));
      }
      pinsContainer.appendChild(fragmentForPins);
    };
    window.backend.load(successLoadHandler);
  };
  window.loadPinDataHandler = loadPinDataHandler;
})();
