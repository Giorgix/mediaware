module.exports = function(app, passport) {
  var Critics = require('../models/critics');
  
  // GET HOME ===================================
  app.get('/', function(req, res) {
      res.render('index');
  });
  app.get('/session', function(req, res) {
    if(req.isAuthenticated()) {  
      res.json(req.user)
    }
    else {
      res.send('no user')
    }

  });
  // LOGIN ======================================
  app.get('/login', function(req, res) {
    if(req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('login', {message: req.flash('loginMessage') });
    }
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',

    failureFlash: true
  }))
  
  // SIGNUP =======================================
  app.get('/signup', function(req, res) {
    if(req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('signup', {message: req.flash('signupMessage') });
    }
  });
    
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  

  // PROFILE =======================================
  app.get('/profile', isLoggedIn, function(req, res) {
    var profile = req.user;
    Critics.findOne({userId: req.user._id}, function(err, critics) {
      if ( err ) res.send(err);
      profile.critics = critics;
    });
    res.render('profile', {profile : profile})
  })
  // LOGOUT ========================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.render('login', {message: 'You need to login'});
  }
}
