app.Movies = Backbone.Collection.extend({
  model: app.Movie
});

app.Users = Backbone.Collection.extend({
  model: app.User,
  
  url: '/signup'
});
