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
    }
  };
  window.utils = Utils;
})();


