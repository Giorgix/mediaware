var app = app || {};

app.MovieFullView = Backbone.View.extend({
  
  model: app.Movie,

  el: '#app',

  template: _.template($('#movie-full-template').html()),

  render: function() {
    this.$el.html(this.template({movie: this.model}));
    return this;
  }
});

app.loginView = Backbone.View.extend({

  el: '#app',

  template: _.template($('#login-template').html()),

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

app.signupView = Backbone.View.extend({

  el: '#app',

  events: {
    'click #signup-btn': 'signupPost'
  },

  template: _.template($('#signup-template').html()),

  signupPost: function(e) {
    e.preventDefault();
    app.Ctrl.signupPost($('#email').val(), $('#password').val());
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
