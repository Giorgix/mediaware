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

  login: function() {
    var loginView = new app.loginView();
    loginView.render();
  },

  signup: function() {
    var signupView = new app.signupView();
    signupView.render();
  },

  signupPost: function(email, password) {
    console.log(email, password);
    this.usersCollection.create({
      email: email,
      password: password
    }, {
      success: function() {
        console.log('user created');
      }
    });
  }
}
