var express = require('express');
var router = express.Router();
var client = require('../client');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/python', function(req, res) {
  client.invoke("hello", "RPC", function(error, data, more) {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
