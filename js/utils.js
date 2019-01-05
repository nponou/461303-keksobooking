'use strict';
(function () {
  var Utils = {
    getRandomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    shuffleArr: function (arr) {
      var j;
      var temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },
    getRandomArr: function (arr, n) {
      var result = new Array(n);
      var len = arr.length;
      var taken = new Array(len);
      if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
      }
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result.sort();
    },
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
    }
  };
  window.utils = Utils;
})();


