var mongoose = require('mongoose');


var itemSimilarity = new mongoose.Schema({
  title: {
    type: String
  },

  similarity: {
    type: Number
  }
});

var similarMovies = new mongoose.Schema({
  title: {
    type: String,
  },

  similarItems: [itemSimilarity]
});

module.exports = mongoose.model('similarMovies', similarMovies);

