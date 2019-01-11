'use strict';
(function () {
  var dataCopy = {};
  function doFeatureFilter(notice, feature) {
    var bool = false;
    for (var i = 0; i < notice.offer.features.length; i++) {
      bool = (notice.offer.features[i] === feature);
      if (bool) {
        break;
      }
    }
    return bool;
  }
  var dataFilterFncn = function () {
    window.utils.clearMap();
    dataCopy = window.Data.objects;
    if (document.getElementById('housing-type').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        return obj.offer.type.toString() === document.getElementById('housing-type').value;
      });
    }
    if (document.getElementById('housing-price').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        if (document.getElementById('housing-price').value.toString() === 'low') {
          return parseInt(obj.offer.price, 10) < 10000;
        } else if (document.getElementById('housing-price').value.toString() === 'middle') {
          return parseInt(obj.offer.price, 10) >= 10000 && parseInt(obj.offer.price, 10) < 50000;
        } else {
          return parseInt(obj.offer.price, 10) >= 50000;
        }
      });
    }
    if (document.getElementById('housing-rooms').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        return obj.offer.guests.toString() === document.getElementById('housing-rooms').value;
      });
    }
    if (document.getElementById('housing-guests').value !== 'any') {
      dataCopy = dataCopy.filter(function (obj) {
        return obj.offer.rooms.toString() === document.getElementById('housing-rooms').value;
      });
    }
    if (document.getElementById('filter-wifi').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'wifi');
      });
    }
    if (document.getElementById('filter-dishwasher').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'dishwasher');
      });
    }
    if (document.getElementById('filter-parking').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'parking');
      });
    }
    if (document.getElementById('filter-washer').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'washer');
      });
    }
    if (document.getElementById('filter-elevator').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'elevator');
      });
    }
    if (document.getElementById('filter-conditioner').checked) {
      dataCopy = dataCopy.filter(function (obj) {
        return doFeatureFilter(obj, 'conditioner');
      });
    }
    window.renderPin(dataCopy);
  };
  var housingFilters = document.querySelector('.map__filters-container').querySelectorAll('select');
  for (var j = 0; j < housingFilters.length; j++) {
    housingFilters[j].addEventListener('change', function () {
      dataFilterFncn();
    });
  }
  var featuresFilter = document.querySelectorAll('.map__checkbox');
  for (var i = 0; i < featuresFilter.length; i++) {
    featuresFilter[i].addEventListener('click', function () {
      var featuresChecked = document.querySelectorAll('.map__checkbox:checked');
      for (var b = 0; b < featuresChecked.length; b++) {
        dataFilterFncn();
      }
    });
  }
})();
