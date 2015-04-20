app.MovieFullView = Backbone.View.extend({
  
  model: app.Movie,

  el: '#app',

  template: _.template($('#movie-full-template').html()),

  render: function() {
    this.$el.html(this.template({movie: this.model}));
    return this;
  }
});
