var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hello yall")
  req.session.test="test"
  res.render('index', { title: 'Express' });
});


module.exports = router;
