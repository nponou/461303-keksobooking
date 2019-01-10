'use strict';
(function () {
  var dataCopy = {};
  var dataFilterFncn = function () {
    if (document.getElementById('housing-type').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        return obj.offer.type.toString() === document.getElementById('housing-type').value;
      });
    } if (document.getElementById('housing-price').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        if (document.getElementById('housing-price').value.toString() === 'low') {
          return parseInt(obj.offer.price, 10) < 10000;
        } else if (document.getElementById('housing-price').value.toString() === 'middle')
      })
    }
    console.log(dataCopy);
  };
  var housingFilters = document.querySelector('.map__filters-container').querySelectorAll('select');
  for (var j = 0; j < housingFilters.length; j++) {
    housingFilters[j].addEventListener('change', function () {
      dataCopy = window.Data.objects.slice();
      console.log(dataCopy);
      dataFilterFncn();
      /* var FiltersStatus = {
        'type': document.getElementById('housing-type').value,
        'price': document.getElementById('housing-price').value,
        'rooms': document.getElementById('housing-rooms').value,
        'guests': document.getElementById('housing-guests').value
      }; */
    });
  }
  var featuresFilter = document.querySelectorAll('.map__checkbox');
  for (var i = 0; i < featuresFilter.length; i++) {
    featuresFilter[i].addEventListener('click', function () {
      var featuresChecked = document.querySelectorAll('.map__checkbox:checked');
      for (var b = 0; b < featuresChecked.length; b++) {
        console.log(featuresChecked[b].value);
      }
    });
  }
})();
