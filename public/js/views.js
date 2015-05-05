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

app.AppView = Backbone.View.extend({
  el: '#app',
  
  template: _.template($('#home-template').html()),

  render: function(res) {
    this.$el.html(this.template({user: res}));
    return this;
 } 
});
