'use strict';
(function () {
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
  for (var j = 0; j < window.Data.OBJECTS_QUANTITY; j++) {
    fragmentForPins.appendChild(renderPin(window.Data.objects[j]));
  }
  pinsContainer.appendChild(fragmentForPins);
})();
