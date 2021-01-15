const express = require('express');
const home = express.Router();

/* GET home page. */
home.get('/', function(req, res) {
  res.send("hello user")
  res.render('index', { title: 'Express' });
});

home.get('/login', function (req, res) {

})


module.exports = home;
