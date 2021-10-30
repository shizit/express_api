var express = require('express');
var router = express.Router();
var app = require('../app');

router.get('/', function(req, res, next) {
  app.dbPool.query("SELECT * FROM travels", function(err, results, fields) {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results);   
 })


});

router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

module.exports = router;