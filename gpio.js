var GPIO = function(){

  var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(17, 'out'),
    button = new Gpio(18, 'in', 'both'),
    door = new Gpio(21, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/"),
    doorVal;
    armed = false;

  function exit() {
    buzzer.unexport();
    button.unexport();
    door.unexport();
    process.exit();
  }

  door.watch(function(err, value){
    if(err) exit();

    if(value === 1){
      ref.child('backDoor').set('Closed');
      doorVal = 1;
    } else {
      ref.child('backDoor').set('Open');
      doorVal = 0;
    }
  });
      
  process.on('SIGINT',exit);

  return {
    arm: function(armDelay, enterDelay){
      armed = true;
      // Arm delay 
      setTimeout(function(){
        if (doorVal === 0) {
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
