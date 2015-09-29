var GPIO = function(){

  var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(17, 'out'),
    button = new Gpio(18, 'in', 'both'),
    door = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
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
    process.exit();
  }

  ref.on('value',function(snapshot){
    var data = snapshot.val();
    motionVal = data.motionVal;
    frontDoorVal = data.frontDoor;
  })

  button.watch(function(err, value){
    if(err) exit();
    if(value === 0){
      armed = false;
      buzzer.writeSync(0);
      ref.child('siren').set('Off');
      ref.child('alarmSystem').set('Disarmed');
      ref.child('armNoDelayMotion').set('false');
    }
  });

  door.watch(function(err, value){
    if(err) exit();

    if(value === 1){
      ref.child('backDoor').set('Closed');
      backDoorVal = 1;
    } else {
      ref.child('backDoor').set('Open');
      backDoorVal = 0;
    }
  });
      
  process.on('SIGINT',exit);

  return {

    arm: function(armDelay, enterDelay){
      armed = true;
      // Arm delay 
      setTimeout(function(){
        if (frontDoorVal === "Open" || backDoorVal === 0) {
          // Enter delay
          setTimeout(function(){
            if(armed){
              buzzer.writeSync(1);
              ref.child('siren').set('On');
            }
          }, enterDelay * 1000);
        } 
      }, armDelay * 1000)
    },

    armMotion: function(armDelay, enterDelay){
      armed = true;
      // Arm delay 
      setTimeout(function(){
        if (frontDoorVal === "Open" || backDoorVal === 0 || motionVal === 1) {
          // Enter delay
          setTimeout(function(){
            if(armed){
              buzzer.writeSync(1);
              ref.child('siren').set('On');
            }
          }, enterDelay * 1000);
        } 
      }, armDelay * 1000)
    },

    disarm: function(){
      console.log("disarm function fired");
      armed = false;
      buzzer.writeSync(0);
      ref.child('siren').set('Off');
    },

    exit: function () {
      console.log("exited cleanly with the exit function");
      exit();
    }
  };
};

module.exports = GPIO();
