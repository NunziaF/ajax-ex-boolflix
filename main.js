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
          apiRicercaFilm(queryRicerca);
  };

  function apiRicercaFilm(queryRicerca) {

    $.ajax({
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
            lingua: film[i].original_languages,
            voto: film[i].vote_average
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
});