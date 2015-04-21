var mongoose = require('mongoose');

var ratedMovie = new mongoose.Schema({
  title: {
    type: String
  },

  rating: Number 
});

var criticsSchema = new mongoose.Schema({
  userId: {
    type: String 
  },
  ratedMovies: [ratedMovie]
});

module.exports = mongoose.model('Critics', criticsSchema);

