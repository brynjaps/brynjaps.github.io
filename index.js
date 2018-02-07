'use strict';

var API_URL = '/videos.json?id=';

document.addEventListener('DOMContentLoaded', function () {
  var main = document.querySelector('#main');

  program.init(main);
});

var program = function () {
  var url = void 0;
  var container = void 0;
  var heading = void 0;
  var bigDiv = void 0;
  var smallDiv = void 0;
  var medDiv = void 0;
  var link = void 0;
  var nDiv = void 0;

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  //nær í data úr videos.json og sýnir þær á síðunni
  function fetchData() {

    document.querySelector('.loading').visible = true;

    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function () {
      var data = JSON.parse(request.response);
      empty(main);
      heading.appendChild(document.createTextNode('Myndbandaleigan'));
      main.appendChild(heading);
      main.appendChild(container);
      for (var i = 0; i < data.categories.length; i++) {

        //býr til div sem heldur utan um flokka myndbanda
        createBigDiv(data.categories[i]);

        //býr til línuna á milli flokkanna
        createBottom();

        //býr til div utan um myndböndin í flokki
        createMedDiv();
        for (var j = 0; j < data.categories[i].videos.length; j++) {
          var video = data.categories[i].videos[j] - 1;
          show(data.videos[video]);
          timeStamp(data.videos[video].created);
        }
      }
    };

    request.send();
  }

  function init(main) {
    heading = document.createElement('h1');
    container = document.createElement('div');
    fetchData();
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=index.js.map