document.addEventListener('DOMContentLoaded', function () {

  // https://google.github.io/styleguide/javascriptguide.xml#Multiline_string_literals
  var orpheusCSS = '<!-- injected by orpheus -->' +
                   '<link rel="stylesheet" href="/orpheus.css">' +
                   '<!-- -->';
  document.head.insertAdjacentHTML('beforeend', orpheusCSS);
 
  var orpheusNav = '<!-- injected by orpheus -->' +
                      '<ul id="orpheusNav">' +
                         '<li><a href="/chris-adams/">Chris Adams</a></li>' +
                         '<li><a href="/calvera/">Calvera</a></li>' +
                         '<li><a href="/vin-tanner/">Vin Tanner</a></li>' +
                         '<li><a href="/chico/">Chico</a></li>' +
                         '<li><a href="/bernardo-oreilly/">Bernardo O\'Reilly</a></li>' +
                         '<li><a href="/lee-basset/">Lee Basset</a></li>' +
                         '<li><a href="/britt-avery/">Britt Avery</a></li>' +
                         '<li style="float:right"><a href="/">Orpheus</a></li>' +
                      '</ul>' +
                    '<!-- -->';
  document.body.insertAdjacentHTML('afterbegin', orpheusNav);
  
  var orpheusNavAnchors = document.getElementById('orpheusNav').getElementsByTagName('a');
  var currentPath = location.pathname;
  for (var anchor = 0; anchor < orpheusNavAnchors.length; anchor++) {
    if(orpheusNavAnchors[anchor].pathname == currentPath) {
      orpheusNavAnchors[anchor].className = "active";
    }
  }

});
