app.Router = new (Backbone.Router.extend({

  routes: {
    'movies/:movieTitle': 'movie',
    '': 'home',
    'recommendations/:userId': 'recomm'
  },

  movie: function(movieTitle) {
    app.Ctrl.showMovie(movieTitle);
  },

  home: function() {
    app.Ctrl.home();
  },

  recomm: function(userId) {
    app.Ctrl.recommendations(userId);
  }
}));

Backbone.history.start();
