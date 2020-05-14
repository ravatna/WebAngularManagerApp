var express = require('express');
var router = express.Router();
var pool = require('../../providers/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hi Users!');
});

router.get('/all', function(req, res, next) {
  pool.query('SELECT 1 as Users', function (err, result, fields) {
    if (err) throw new Error(err)
    // Do something with result.
    res.send(result);
  })
});

module.exports = router;
