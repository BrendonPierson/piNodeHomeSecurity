var io = (function(){
var Gpio = require('onoff').Gpio,
  backDoor = new Gpio(23, 'in', 'falling'),
  pir = new Gpio(16, 'in', 'both'),
  buzzer = new Gpio(25, 'out'),
  button = new Gpio(12, 'in', 'both'),
  exit = function() {
    buzzer.unexport();
    button.unexport();
    backDoor.unexport();
    pir.unexport();
    process.exit();
  }

  return {
    soundAlarm: function(){
      buzzer.write(1);
    },
    stopAlarm: function(){
      buzzer.write(0);
    },
    armedNoDelay: function(){
      backDoor.watch(function(err, value){
      if (err) exit ();
        soundAlarm();
      }
    },
    armedWithDelay: function() {
      backDoor.watch(function(err, value){
      if (err) exit ();
        setTimeout(soundAlarm, 10000);
      }
    },
    exit: function() {
      buzzer.unexport();
      button.unexport();
      backDoor.unexport();
      pir.unexport();
      process.exit();
    },
  }
});



 
process.on('SIGINT', io.exit);


module.exports = io;
