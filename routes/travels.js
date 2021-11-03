var express = require('express');
var router = express.Router();
var app = require('../app');


router.get('/', function(req, res, next) {
  app.dbPool.query("SELECT * FROM travels", function(err, results, fields) {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(results);   
  });
});

router.post('/', function(req, res, next) { 
  (async() => {
    promisePool = app.dbPool.promise();
    const { travel_id, travel_name, travel_date } = req.body;
    await promisePool.query("INSERT INTO travels(travel_name, travel_date) VALUES (?, ?)",[travel_name,travel_date]);
    const [getRows, getFields] = await promisePool.query("SELECT * FROM travels");
    await res.header('Content-Type', 'application/json; charset=utf-8')
    await res.send(getRows); 
  })();
});

router.delete('/:travel_id', function(req, res, next) { 
  (async() => {
    promisePool = app.dbPool.promise();
    await promisePool.query("DELETE FROM travels WHERE travel_id = ?",[req.params.travel_id]).catch(e => console.log(e));
    const [getRows, getFields] = await promisePool.query("SELECT * FROM travels");
    await res.header('Content-Type', 'application/json; charset=utf-8')
    await res.send(getRows); 
  })();
});

module.exports = router;