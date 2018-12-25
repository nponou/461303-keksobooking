'use strict';
(function () {
  var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var popupsList = document.querySelectorAll('.popup');
  var closeButtons = document.querySelectorAll('.popup__close');

  var checkActivePopup = function () {
    var openedPopup = document.querySelector('.popup.active');
    if (openedPopup) {
      openedPopup.classList.add('hidden');
      openedPopup.classList.remove('active');
    }
  };

  function popupCloseHandler(btn) {
    btn.classList.add('hidden');
  }

  function mapClickHandler(target, advPopup, closeBtn) {
    target.addEventListener('click', function () {
      checkActivePopup();
      advPopup.classList.add('active');
      advPopup.classList.remove('hidden');
    });
    closeBtn.addEventListener('click', function () {
      if (closeBtn.parentNode === advPopup) {
        popupCloseHandler(advPopup);
      }
    });
  }

  for (var a = 0; a < pinsList.length; a++) {
    mapClickHandler(pinsList[a], popupsList[a], closeButtons[a]);
  }
})();
