'use strict';
(function () {
  var Backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('\'Статус ответа: \' + xhr.status + \' \' + xhr.statusText');
        }
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соеденения');
        });
        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
      });
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobookings';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onLoad(xhr);
      });
      xhr.addEventListener('error', function () {
        onError(xhr);
      });
      xhr.addEventListener('timeout', function () {
        onError(xhr.response);
      });
      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
  window.backend = Backend;
})();
