var express = require('express');
var router = express.Router();
var client = require('../client');

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

router.get('/recommendations/:user', function(req, res) {
  client.invoke("calcSimilarItems", critics, function(error, itemMatch, more) {
    client.invoke("getRecommendedItems", 
                  critics, 
                  itemMatch, 
                  req.params.user, function(err, rec, more) {
      console.log(rec);
      res.send(rec);
    });
  });
});

module.exports = router;
