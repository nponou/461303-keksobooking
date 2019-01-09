'use strict';
(function () {
  var loadCardDataHandler = function () {
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
        if (offer.addres) {
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
    var successLoadHandler = function (objectData) {
      for (var k = 0; k < objectData.length; k++) {
        document.querySelector('.map').insertBefore(renderAdvtCard(objectData[k]), filtersContainer);
      }
    };
    window.backend.load(function (data) {
      successLoadHandler(data);
      window.pinClickHandler();

    });
  };
  window.loadCardDataHandler = loadCardDataHandler;
})();
