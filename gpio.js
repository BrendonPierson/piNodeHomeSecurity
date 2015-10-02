var GPIO = function(){

  var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(17, 'out'),
    led = new Gpio(26, 'out'),
    button = new Gpio(18, 'in', 'both'),
    door = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    twilio = require('./text'),
    textNotSent = true,
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/"),
    frontDoorVal,
    backDoorVal,
    motionVal,
    armed = false;

  function exit() {
    buzzer.unexport();
    button.unexport();
    door.unexport();
    led.unexport();
    process.exit();
  }

  ref.child('sensors').on('value',function(snapshot){
    var data = snapshot.val();
    motionVal = data.motionVal;
    frontDoorVal = data.frontDoor;
    if(data.siren === 'On' && textNotSent){
      twilio();
      textNotSent = false;
    }
  });

  button.watch(function(err, value){
    if(err) exit();
    if(value === 0){
      console.log("disarm push button pressed at: ", new Date().toLocaleTimeString());
      armed = false;
      buzzer.writeSync(0);
      ref.child('sensors').child('siren').set('Off');
      ref.child('arm').child('alarmSystem').set('Disarmed');
      ref.child('arm').child('armNoDelayMotion').set('false');
    }
  });

  door.watch(function(err, value){
    if(err) exit();

    if(value === 1){
      ref.child('sensors').child('backDoor').set('Closed');
      backDoorVal = 1;
      console.log("Backdoor closed at: ", new Date().toLocaleTimeString());
    } else {
      ref.child('sensors').child('backDoor').set('Open');
      backDoorVal = 0;
      console.log("backdoor open at: ", new Date().toLocaleTimeString());
    }
  });
      
  process.on('SIGINT',exit);

  return {

    arm: function(armDelay, enterDelay){
        // Blink led when armed
        var iv = setInterval(function(){
          led.writeSync(led.readSync() === 0 ? 1 : 0)
        }, 1000);
        console.log("arm function running");
        // use armed value as a way for disarm to break this function
        armed = true;
        // Only send one text by tracking this variable
        textNotSent = false;
        // Arm delay 
        setTimeout(function(){
        // Stop blinking
        clearInterval(iv);
        // Light led to show its armed
        led.writeSync(1);

        // Reset the arming delay to 0 so that it trips immediately now
        ref.child('arm').child('armDelay').set(0);
        if (frontDoorVal === "Open" || backDoorVal === 0) {
          console.log("frontDoor or backDoor is open");
          // Enter delay
          setTimeout(function(){
            if(armed){
              console.log("buzzer should be sounding");
              buzzer.writeSync(1);
              ref.child('sensors').child('siren').set('On');
            }
          }, enterDelay * 1000);
        } 
      }, armDelay * 1000);
    },

    armMotion: function(armDelay, enterDelay){
      var iv = setInterval(function(){
        led.writeSync(led.readSync() === 0 ? 1 : 0)
      }, 500);
      armed = true;
      textNotSent = false;
      // Arm delay 
      setTimeout(function(){
        clearInterval(iv);
        led.writeSync(1);
        ref.child('arm').child('armDelay').set(0);
        if (frontDoorVal === "Open" || backDoorVal === 0 || motionVal === 1) {
          // Enter delay
          console.log("alarm tripped");
          setTimeout(function(){
            if(armed){
              buzzer.writeSync(1);
              ref.child('sensors').child('siren').set('On');
              console.log("armed delay siren should be on");
            }
          }, enterDelay * 1000);
        } 
      }, armDelay * 1000);
    },

    disarm: function(){
      console.log("disarm function fired");
      armed = false;
      buzzer.writeSync(0);
      led.writeSync(0);
      ref.child('sensors').child('siren').set('Off');
    },

    exit: function () {
      console.log("exited cleanly with the exit function");
      exit();
    }
  };
};

module.exports = GPIO();
