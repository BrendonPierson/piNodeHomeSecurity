var Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/"),
    timeModule = require('../time'),
    GPIO = require('./gpio');
    // Uncomment the line below if you want to test/ debug on a non-raspberry pi
    // GPIO = require('./consoleGPIO');


// Listen for changes to the firebase data
ref.on("value", function(snapshot){
  var data = snapshot.val();
  console.log("fb data", data.sensors);
  console.log("time of fb change", timeModule.localTime());

  // Arm the system
  if(data.arm.alarmSystem === "Armed" && data.arm.armedWithMotion){
    GPIO.armMotion(data.arm.armDelay, data.arm.enterDelay);
    console.log("armed with motion and delay settings: ", data.arm.armDelay, data.arm.enterDelay);
  } else if(data.arm.alarmSystem === "Armed"){
    GPIO.arm(data.arm.armDelay, data.arm.enterDelay);
    console.log("armed with delay settings: ", data.arm.armDelay, data.arm.enterDelay);
  } 

  // Disarm the system
  if(data.arm.alarmSystem !== "Armed") {
    console.log("disarmed at: ", timeModule.localTime());
    GPIO.disarm();
  }

});