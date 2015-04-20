/*******************
 * TODO
 *
 * check if there is recommendations
 * iterate over the recommendations
 * show only those with predicted ranking higher than 2.5 over 5
 *
 */

var express = require('express');
var router = express.Router();
var client = require('../client');
var http = require('http');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSimilarity = new Schema({
  title: {
    type: String
  },

  similarity: {
    type: Number
  }
});

var movie = new Schema({
  title: {
    type: String,
  },

  similarItems: [itemSimilarity]
});

var Movie = mongoose.model('movie', movie);

var critics = {
    'Lisa': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'Superman Returns': 3.5,
        'You, Me and Dupree': 2.5,
        'The Night Listener': 3.0},
    'Gene': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 1.5,
        'Superman Returns': 5.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 3.5},
    'Michael': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.0,
        'Superman Returns': 3.5,
        'The Night Listener': 4.0},
    'Claudia': {
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'The Night Listener': 4.5,
        'Superman Returns': 4.0,
        'You, Me and Dupree': 2.5},
    'Mick': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'Just My Luck': 2.0,
        'Superman Returns': 3.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 2.0},
    'Jack': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'The Night Listener': 3.0,
        'Superman Returns': 5.0,
        'You, Me and Dupree': 3.5},
    'Toby': {
        'Snakes on a Plane': 4.5,
        'You, Me and Dupree': 1.0,
        'Superman Returns': 4.0}}




/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/*router.get('/movies/:title', function(req, res) {
  console.log(req.params.title);
  var movieTitle = req.params.title.split(' ').join('+');
  var options = {
    host : 'www.omdbapi.com',
    path : '/?t=' + movieTitle,
    port : 80,
    method : 'GET'
  }

  http.request(options, function(response){
    var data;
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      data = chunk;
    });
    response.on('end', function() {
      res.send(data); 
    });
  }).end();
});
*/
router.get('/recommendations/calcSimilarItems', function(req, res) {
  client.invoke("calcSimilarItems", critics, function(error, itemMatch, more) {
    for(var movie in itemMatch) {
      var newMovie = new Movie({
        title: movie
      });
      for(var similarMovie in itemMatch[movie]) {
        newMovie.similarItems.addToSet({
          title: similarMovie,
          similarity: itemMatch[movie][similarMovie]
        })
        //console.log(itemMatch[movie][similarMovie]);
      }
      newMovie.save(function(err, similarMovies) {
        if(err) res.send(err);
        res.json(itemMatch);
      });
    }
  });
});

router.get('/recommendations/similarItems', function(req, res) {
  Movie.find(function(err, data) {
    res.json(data);
  });
});

// this is shiet think about the object parsing
router.get('/recommendations/:user', function(req, res) {
  var items = {};
  Movie.find(function(error, itemMatch) {
    for(var movie in itemMatch) {
      items[itemMatch[movie].title] = [];
      //console.log(itemMatch[movie].similarItems);
      for(var i = 0; i < itemMatch[movie].similarItems.length; i++) {
        var movieTitle = itemMatch[movie].similarItems[i].title;
        var item = {};
        item[movieTitle] = itemMatch[movie].similarItems[i].similarity;
      items[itemMatch[movie].title].push(item);
      }
    }
    client.invoke("getRecommendedItems", 
                  critics, 
                  items, 
                  req.params.user, function(err, rec, more) {
      console.log(rec);
      var movieTitle = rec[0][1];
      var movie;
      http.request('http://localhost:3000/movies/' + movieTitle, function(response){
        response.on('data', function(data) {
          movie = JSON.parse(data);
        });
        response.on('end', function() {
          res.json(movie);
        });
      }).end();
    });
  });
});

module.exports = router;
