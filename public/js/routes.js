app.Router = new (Backbone.Router.extend({

  routes: {
    'movies/:movieTitle': 'movie',
    'login': 'login',
    'signup': 'signup'
  },

  movie: function(movieTitle) {
    app.Ctrl.showMovie(movieTitle);
  },

  login: function() {
    app.Ctrl.login();
  },

  signup: function() {
    app.Ctrl.signup();
  }
}));

Backbone.history.start();
