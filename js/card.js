'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var renderAdvtCard = function (objectData) {
    var cardClone = mapCardTemplate.cloneNode(true);
    var renderTitle = function (data) {
      cardClone.querySelector('.popup__title').textContent = data.offer.title;
    };
    objectData.offer.title && renderTitle(objectData);
    cardClone.querySelector('.popup__text--address').textContent = objectData.offer.address;
    cardClone.querySelector('.popup__text--price').innerHTML = objectData.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = window.utils.typeSelector(objectData);
    cardClone.querySelector('.popup__text--capacity').innerHTML = objectData.offer.rooms + ' комнаты для ' + objectData.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + objectData.offer.checkin + ', выезд до ' + objectData.offer.checkout;
    cardClone.querySelector('.popup__description').textContent = '';
    cardClone.querySelector('.popup__features').innerHTML = '';
    for (var featureIndex = 0; featureIndex < objectData.offer.features.length; featureIndex++) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + objectData.offer.features[featureIndex];
      cardClone.querySelector('.popup__features').appendChild(featureElement);
    }
    for (var photosQuantity = 0; photosQuantity < objectData.offer.photos.length; photosQuantity++) {
      var photoClone = cardClone.querySelector('.popup__photo').cloneNode(true);
      photoClone.src = objectData.offer.photos[photosQuantity];
      cardClone.querySelector('.popup__photos').appendChild(photoClone);
    }
    var parentnode = cardClone.querySelector('.popup__photos');
    var childnode = parentnode.children;
    childnode[0].remove();
    cardClone.querySelector('.popup__avatar').src = objectData.author.avatar;
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
})();
