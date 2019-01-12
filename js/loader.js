'use strict';
(function () {
  var loader = function (objectData, load) {
    if (load) {
      window.Data.objects = objectData;
    }
    var MAX_NOTICE = 5;
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

    var fragmentForPins = document.createDocumentFragment();
    for (var j = 0; j < objectData.length; j++) {
      if (j === MAX_NOTICE) {
        break;
      }
      fragmentForPins.appendChild(renderPin(objectData[j]));
    }
    pinsContainer.appendChild(fragmentForPins);
    var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var filtersContainer = document.querySelector('.map__filters-container');
    var renderAdvtCard = function (data) {
      var cardClone = mapCardTemplate.cloneNode(true);
      var renderContent = function (content, selector) {
        cardClone.querySelector(selector).textContent = content;
      };
      if (data.offer) {
        var offer = data.offer;
        if (offer.title) {
          renderContent(offer.title, '.popup__title');
        }
        if (offer.address) {
          renderContent(offer.address, '.popup__text--address');
        }
        if (offer.price) {
          renderContent(offer.price, '.popup__text--price');
        }
        if (offer.rooms) {
          renderContent(offer.rooms + ' комнаты для ' + offer.guests + ' гостей', '.popup__text--capacity');
        }
        if (offer.checkin) {
          renderContent('Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout, '.popup__text--time');
        }
        cardClone.querySelector('.popup__description').textContent = '';
        cardClone.querySelector('.popup__features').innerHTML = '';
        if (offer.photos.length > 0) {
          for (var featureIndex = 0; featureIndex < offer.features.length; featureIndex++) {
            var featureElement = document.createElement('li');
            featureElement.className = 'popup__feature popup__feature--' + offer.features[featureIndex];
            cardClone.querySelector('.popup__features').appendChild(featureElement);
          }
        }
        if (offer.features.length > 0) {
          for (var photosQuantity = 0; photosQuantity < offer.photos.length; photosQuantity++) {
            var photoClone = cardClone.querySelector('.popup__photo').cloneNode(true);
            photoClone.src = offer.photos[photosQuantity];
            cardClone.querySelector('.popup__photos').appendChild(photoClone);
          }
        }
      }
      cardClone.querySelector('.popup__type').textContent = window.utils.typeSelector(data);
      var parentnode = cardClone.querySelector('.popup__photos');
      var childnode = parentnode.children;
      childnode[0].remove();
      cardClone.querySelector('.popup__avatar').src = data.author.avatar;
      cardClone.classList.add('hidden');
      return cardClone;
    };

    for (var k = 0; k < objectData.length; k++) {
      if (k === MAX_NOTICE) {
        break;
      }
      document.querySelector('.map').insertBefore(renderAdvtCard(objectData[k]), filtersContainer);
    }
    window.pinClickHandler();
  };
  window.loader = loader;
})();
