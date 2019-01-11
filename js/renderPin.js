'use strict';
(function () {
  var renderPin = function (data) {
    var pinsContainer = document.querySelector('.map__pins');
    var render = function (arrayElement) {
      var pinClone = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      pinClone.style.left = arrayElement.location.x + 'px';
      pinClone.style.top = arrayElement.location.y + 'px';
      pinClone.querySelector('img').src = arrayElement.author.avatar;
      pinClone.querySelector('img').alt = arrayElement.offer.title;
      pinClone.querySelector('img').style.pointerEvents = 'none';
      return pinClone;
    };
    var fragmentForPins = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      fragmentForPins.appendChild(render(data[j]));
    }
    pinsContainer.appendChild(fragmentForPins);
  };
  window.renderPin = renderPin;
})();
