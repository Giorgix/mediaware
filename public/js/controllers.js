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

  recommendations: function(userId) {
    var recommendationsView = new app.RecommendationsView();
    $.ajax({
      type: 'GET',
      url: '/api/recommendations/' + userId,
      success: function(res) {
        recommendationsView.render(res);
      }
    });
  },

  home: function() {
    var self = this;
    var homeView = new app.AppView();
    $.ajax({
      type: 'GET',
      url: '/session',
      success: function(res) {
        homeView.render(res);
        if(res != 'no user') {
          self.recommendations(res._id);
        }
      }
    });
  }
}
