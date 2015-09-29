var express = require('express'),
    app = express(),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/"),
    GPIO = require('./gpio');
    // Uncomment the line below if you want to test/ debug on a non-raspberry pi
    // GPIO = require('./consoleGPIO');

// Listen for changes to the firebase data
ref.on("value", function(snapshot){
  var data = snapshot.val();
  console.log("fb data", data);

  // Arm the system
  if(data.alarmSystem === "Armed"){
    GPIO.arm(data.armDelay, data.enterDelay);
    console.log("armed with delay settings: ", data.armDelay, data.enterDelay);
  }

  // Disarm the system
  if(data.alarmSystem !== "Armed") {
    GPIO.disarm();
  }

});


//serve the static files (css, client js)
app.use("/public", express.static(__dirname + '/public'));

//start listening on the port
var server = app.listen(process.env.PORT || 80, function(){
  console.log("Express server listening on port %s", server.address().port);
});







