//load express and create app instance
var express = require('express'),
    app = express();

//use express middleware: static to serve anything found in the public folder
app.use(express.static('public'));

//starts the server
var server = app.listen(8088, function(){
  console.log("Express server listening on port %s", server.address().port);
});
