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
  el: '#menu-bar',
  
  template: _.template($('#menu-template').html()),

  render: function(res) {
    this.$el.html(this.template({user: res}));
    return this;
 } 
});

app.RecommendationsView = Backbone.View.extend({
  el: '#recommendations',
  
  template: _.template($('#recommendations-template').html()),

  render: function(res) {
    console.log(res);
    this.$el.html(this.template({recomm: res}));
    return this;
 } 
});
