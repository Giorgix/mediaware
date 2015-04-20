app.Ctrl = {
  
  movieCollection: new app.Movies(movies),

  movie: null,

  initialize: function() {
  
  },

  showMovie: function(movieTitle) {
    this.movie = this.movieCollection.findWhere({Title: movieTitle});

    var movieFullView = new app.MovieFullView({model: this.movie});
    movieFullView.render();
  }
}
