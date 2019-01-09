'use strict';
(function () {
  var closeErrorClickHandler = function (button, error) {
    button.addEventListener('click', function () {
      document.body.removeChild(error);
      window.map.reset();
    });
  };
  var onXhrEvent = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
  };
  var Backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      onXhrEvent(xhr, onLoad, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      onXhrEvent(xhr, onLoad, onError);
      xhr.timeout = 10000;
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
