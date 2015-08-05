var express = require('express');
var app = express();
var fs = require('fs');
var GPIO = require('./gpio');

//Arming Routes
app.get('/armedNoDelay', function(req, res) {
  console.log("Armed no delay!");
  GPIO.armedNoDelay();
  res.type('text/html');
  fs.readFile('public/armedNoDelay.html',
    function (err, data) {
      if (err) throw err;
      res.send(data.toString());
    });
});

app.get('/armedWithDelay', function(req, res) {
  console.log("Armed with delay!");
  GPIO.armedWithDelay();
  res.type('text/html');
  fs.readFile('public/armedWithDelay.html',
    function (err, data) {
      if (err) throw err;
      res.send(data.toString());
    });
});

app.get('/disarm', function(req, res) {
  console.log("disarmed!");
  GPIO.disarm();
  res.type('text/html');
  fs.readFile('public/index.html',
    function (err, data) {
      if (err) throw err;
      res.send(data.toString());
    });
});

app.get('/', function(req, res) {
  res.type('text/html'); 
  fs.readFile('public/index.html',
    function (err, data) {
      if (err) throw err;
      res.send(data.toString());
    });
});

//serve the static files
app.use("/public", express.static(__dirname + '/public'));

//start listening on the port
var server = app.listen(process.env.PORT || 4730, function(){
  console.log("Express server listening on port %s", server.address().port);
});

//process.on('SIGINT', GPIO.exit());




