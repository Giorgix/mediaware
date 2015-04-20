app.Router = new (Backbone.Router.extend({


  initialize: function() { 
  },

  routes: {
    'movies/:movieTitle': 'movie',
  },

  movie: function(movieTitle) {
    app.Ctrl.showMovie(movieTitle);
  },
}));

Backbone.history.start();
