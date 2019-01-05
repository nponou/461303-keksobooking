'use strict';
(function () {
  var roomsCount = document.getElementById('room_number');
  var guestsCount = document.getElementById('capacity');

  roomsCount.addEventListener('change', function () {
    switch (roomsCount.options[roomsCount.selectedIndex]) {
      case roomsCount.options[0] :
        guestsCount.options[0].setAttribute('disabled', 'disabled');
        guestsCount.options[1].setAttribute('disabled', 'disabled');
        guestsCount.options[2].removeAttribute('disabled');
        guestsCount.options[3].setAttribute('disabled', 'disabled');
        guestsCount.options[2].selected = true;
        break;
      case roomsCount.options[1] :
        guestsCount.options[0].setAttribute('disabled', 'disabled');
        guestsCount.options[1].removeAttribute('disabled');
        guestsCount.options[1].selected = true;
        guestsCount.options[2].removeAttribute('disabled');
        guestsCount.options[3].setAttribute('disabled', 'disabled');
        break;
      case roomsCount.options[2] :
        guestsCount.options[0].removeAttribute('disabled');
        guestsCount.options[0].selected = true;
        guestsCount.options[1].removeAttribute('disabled');
        guestsCount.options[2].removeAttribute('disabled');
        guestsCount.options[3].setAttribute('disabled', 'disabled');
        break;
      case roomsCount.options[3] :
        guestsCount.options[0].setAttribute('disabled', 'disabled');
        guestsCount.options[1].setAttribute('disabled', 'disabled');
        guestsCount.options[2].setAttribute('disabled', 'disabled');
        guestsCount.options[3].removeAttribute('disabled');
        guestsCount.options[3].selected = true;
        break;
    }
  });

  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');

  timeIn.addEventListener('change', function () {
    switch (timeIn.options[timeIn.selectedIndex]) {
      case timeIn.options[0] :
        timeOut.options[0].selected = true;
        break;
      case timeIn.options[1] :
        timeOut.options[1].selected = true;
        break;
      case timeIn.options[2] :
        timeOut.options[2].selected = true;
        break;
    }
  });


  var typePrice = document.getElementById('price');
  var typesSelector = document.getElementById('type');

  typesSelector.addEventListener('change', function () {
    switch (typesSelector.options[typesSelector.selectedIndex].value) {
      case 'bungalo' :
        typePrice.placeholder = '0';
        typePrice.setAttribute('min', '0');
        break;
      case 'flat' :
        typePrice.placeholder = '1000';
        typePrice.setAttribute('min', '1000');
        break;
      case 'house' :
        typePrice.placeholder = '5000';
        typePrice.setAttribute('min', '5000');
        break;
      case 'palace' :
        typePrice.placeholder = '10000';
        typePrice.setAttribute('min', '10000');
        break;
    }
  });
  var form = document.querySelector('.ad-form');
  var successHandler = function (evt) {
    evt.preventDefault();
    var removeSuccessHandler = function () {
      document.querySelector('.map').removeChild(document.querySelector('.active__message'));
      document.removeEventListener('click', removeSuccessHandler);
    };
    window.backend.save(new FormData(form), function () {
      var successLoadMsg = document.getElementById('success').content.querySelector('.success');
      successLoadMsg.classList.add('active__message');
      document.querySelector('.map').insertAdjacentElement('afterbegin', successLoadMsg);
      window.utils.resetMap();
    });
    document.addEventListener('click', removeSuccessHandler);
    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.keyCode === 27) {
        removeSuccessHandler();
      }
    });
  };
  var resetBtn = document.querySelector('.ad-form__reset');
  resetBtn.addEventListener('click', function () {
    window.utils.resetMap();
  });
  form.addEventListener('submit', successHandler);
})();
