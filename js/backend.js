'use strict';
(function () {
  var closeErrorClickHandler = function (button, error) {
    button.addEventListener('click', function () {
      document.body.removeChild(error);
      window.utils.resetMap();
    });
  };
  var addXhrEvents = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response, true);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
  };
  var Backend = {
    load: function (loadHandler, errorHandler) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      addXhrEvents(xhr, loadHandler, errorHandler);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, loadHandler, errorHandler) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      addXhrEvents(xhr, loadHandler, errorHandler);
      xhr.open('POST', URL);
      xhr.send(data);
    },
    ErrorHandler: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__message').textContent = errorMessage;
      document.body.appendChild(errorElement);
      var closeButton = errorElement.querySelector('.error__button');
      closeErrorClickHandler(closeButton, errorElement);
    }
  };
  window.backend = Backend;
})();
