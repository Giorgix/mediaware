app.Ctrl = {
  
  movie: null,

  movieCollection: new app.Movies(movies),
  
  usersCollection: new app.Users(),
  
  initialize: function() {
  },

  showMovie: function(movieTitle) {
    this.movie = this.movieCollection.findWhere({Title: movieTitle});

    var movieFullView = new app.MovieFullView({model: this.movie});
    movieFullView.render();
  },

  home: function() {
    console.log('index');
    var homeView = new app.AppView();
    $.ajax({
      type: 'GET',
      url: '/session',
      success: function(res) {
        homeView.render(res);
      }
    });
  }


}
