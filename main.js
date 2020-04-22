$(document).ready(function() {

  $('button').click(cerca);
  $('.search').keypress(function (event) {
      if (event.keyCode == 13) {
          cerca();
      }
  });

  function cerca() {
    var queryRicerca = $('.search').val().toLowerCase();
    $('.search').val('');
    $('.box').empty("");

    $.ajax({                                              //chiamata per film
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "312b2156318a58c856f04d6d1a66e105",
        language: "it-IT",
        query: queryRicerca
      },
      success: function(data) {
        var film = data.results;
        for (var i = 0; i < film.length; i++) {
          var context = {
            titolo: film[i].title,
            titoloOriginale: film[i].original_title,
            flag: flags(film[i].original_language),
            voto: film[i].vote_average,
            cover: film[i].poster_path,
            tipo: "film"
          };
          var source = $('#film-template').html();
          var template = Handlebars.compile(source);
          var html = template(context);
          $('.box').append(html);
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });

    $.ajax({                                          //chiamata per serie tv
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: "312b2156318a58c856f04d6d1a66e105",
        language: "it-IT",
        query: queryRicerca
      },
      success: function(data) {
        var tv = data.results;
        for (var i = 0; i < tv.length; i++) {
          var context = {
            titolo: tv[i].title,
            titoloOriginale: tv[i].original_title,
            flag: flags(tv[i].original_language),
            voto: tv[i].vote_average,
            cover: tv[i].poster_path,
            tipo: "serie tv"
          };
          var source = $('#film-template').html();
          var template = Handlebars.compile(source);
          var html = template(context);
          $('.box').append(html);
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });

  };

  function flags(lingua){                        //sostituzione della lingua con le bandiere
    var flag = lingua;
    if (flag === "it") {
      flag = '<img src="https://www.countryflags.io/it/shiny/64.png">'
    } else if (flag === "en") {
      flag = '<img src="https://www.countryflags.io/gb/shiny/64.png">'
    }
    return flag;
  };

});
