var GPIO = function(){

  var Gpio = require('onoff').Gpio,
      backDoor = new Gpio(23, 'in', 'falling'), //blue
      pir = new Gpio(16, 'in', 'both'), //orange
      buzzer = new Gpio(25, 'out'), //purple
      button = new Gpio(12, 'in', 'both'), //white
      led = new Gpio(17, 'out'); //black
      
  return {
    soundAlarm: function(){
      buzzer.write(1);
      console.log("buzz On")
    },
    stopAlarm: function(){
      buzzer.write(0);
      console.log("buzz off")
    },
    armedNoDelay: function(){
      backDoor.watch(function(err, value){
      if (err) exit ();
        soundAlarm();
      });
    },
    armedWithDelay: function() {
      backDoor.watch(function(err, value){
      if (err) exit ();
      setTimeout(soundAlarm(), 10000);
      
    },
    exit: function() {
      buzzer.unexport();
      button.unexport();
      backDoor.unexport();
      pir.unexport();
      led.unexport();
      process.exit();
    },
  }
};



 



module.exports = GPIO();
