$(document).ready(function() {

  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

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
        var coverInizio = "https://image.tmdb.org/t/p/w342";
        for (var i = 0; i < film.length; i++) {
          var context = {
            titolo: film[i].title,
            titoloOriginale: film[i].original_title,
            flag: flags(film[i].original_language),
            voto: stelle(film[i].vote_average),
            cover: coverInizio + film[i].poster_path,
            tipo: "film"
          };

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
            titolo: tv[i].name,
            titoloOriginale: tv[i].original_name,
            flag: flags(tv[i].original_language),
            voto: stelle(tv[i].vote_average),
            cover: NoImage(tv[i].poster_path),
            tipo: "serie tv"
          };

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
    if (lingua === "it") {
      lingua = '<img src="https://www.countryflags.io/it/shiny/64.png">'
    } else if (lingua === "en") {
      lingua = '<img src="https://www.countryflags.io/gb/shiny/64.png">'
    }
    return lingua;
  };


  function stelle(voto){                      //trasformazione voto in stelle
    var stella = '';
    voto5 = Math.ceil(voto / 2);
    for (var i = 1; i <= 5; i++) {
      if (i <= voto5) {
        stella += '<i class="fas fa-star"></i>'
      } else {
        stella = stella + '<i class="far fa-star"></i>'  // += è uguale a = stella +
      }
    }
    return stella;
  };

  function NoImage(cover) {    //inserisco immagine vuota dove non c'è cover
    if (cover == null) {
      cover = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg'
    } else {
        cover = 'https://image.tmdb.org/t/p/w342' + cover;
    }
    return cover;
  };

});
