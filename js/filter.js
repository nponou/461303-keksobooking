'use strict';
(function () {
  var featuresCheckHandler = function () {
    for (var k = 0; k < featuresFilter.length; k++) {
      if (featuresFilter[k].checked === true) {
        console.log(k);
      }
    }
  };
  var filterfunction = function (obj) {
    if (housingType.value === 'any') {
      return true;
    }
    return obj.offer.type === housingType.value;
  };
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var featuresFilter = document.querySelectorAll('.map__checkbox');
  housingType.addEventListener('change', function () {
    var objClone = window.Data.objects.slice();
    console.log(objClone.filter(filterfunction));
  });
 /* housingPrice.addEventListener('change');
  housingRooms.addEventListener('change');
  housingGuests.addEventListener('change');*/
  for (var i = 0; i < featuresFilter.length; i++) {
    featuresFilter[i].addEventListener('change', featuresCheckHandler);
  }
})();
