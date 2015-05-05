app.Router = new (Backbone.Router.extend({

  routes: {
    'movies/:movieTitle': 'movie',
    '': 'home'
  },

  movie: function(movieTitle) {
    app.Ctrl.showMovie(movieTitle);
  },

  home: function() {
    app.Ctrl.home();
  }
}));

Backbone.history.start();
