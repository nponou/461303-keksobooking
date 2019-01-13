'use strict';
(function () {
  var Utils = {
    typeSelector: function (element) {
      var TypeSelector = {
        house: 'Дом',
        bungalo: 'Бунгало',
        palace: 'Дворец'
      };
      return TypeSelector[element.offer.type] ? TypeSelector[element.offer.type] : 'Квартира';
    },
    resetMap: function () {
      var map = document.querySelector('.map');
      var form = document.querySelector('.ad-form');
      var mainPin = document.querySelector('.map__pin--main');
      this.disableFilterList(true);
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      form.reset();
      mainPin.style.top = 375 + 'px';
      mainPin.style.left = 570 + 'px';
      this.autoCompleteAddress(mainPin);
      this.clearMap();
    },
    autoCompleteAddress: function (element) {
      var inputAddress = document.querySelector('#address');
      inputAddress.disabled = true;
      inputAddress.readOnly = false;
      inputAddress.value = (+element.style.left.substr(0, element.style.left.length - 2) + element.offsetWidth / 2)
        + ', ' + (+element.style.top.substr(0, element.style.top.length - 2) + element.offsetHeight);
    },
    clearMap: function () {
      var pinListAfterRender = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cardListAfterRender = document.querySelectorAll('.map__card');
      for (var i = 0; i < pinListAfterRender.length; i++) {
        pinListAfterRender[i].remove();
        cardListAfterRender[i].remove();
      }
    },
    disableFilterList: function (bool) {
      var filterList = this.getFilterList();
      for (var i = 0; i < filterList.length; i++) {
        for (var j = 0; j < filterList[i].length; j++) {
          filterList[i][j].disabled = bool;
        }
      }
    },
    getFilterList: function () {
      var filterList = [];
      filterList.push(document.querySelectorAll('.ad-form-header input'));
      filterList.push(document.querySelectorAll('.ad-form__element select'));
      filterList.push(document.querySelectorAll('.ad-form__element input:not(#address)'));
      filterList.push(document.querySelectorAll('.ad-form__element textarea'));
      filterList.push(document.querySelectorAll('.map__filters select'));
      filterList.push(document.querySelectorAll('.map__filters input'));
      filterList.push(document.querySelectorAll('.ad-form__element button'));
      return filterList;
    },
    DEBOUNCE_INTERVAL: 500,
    debounce: function (cb) {
      var _this = this;
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, _this.DEBOUNCE_INTERVAL);
      };
    }
  };
  Utils.resetMap();
  window.utils = Utils;
})();


