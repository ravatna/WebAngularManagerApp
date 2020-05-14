var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi Angular Backend Service.');
  // res.render('index', { title: 'Express' });
});

router.get('/status', function(req, res, next) {
  res.send('Status.');
  // res.render('index', { title: 'Express' });
});

router.get('/info', function(req, res, next) {
  res.send('Info.');
  // res.render('index', { title: 'Express' });
});

module.exports = router;
