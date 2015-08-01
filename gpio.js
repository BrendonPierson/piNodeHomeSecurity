var io = (function(){

  var Gpio = require('onoff').Gpio,
      backDoor = new Gpio(23, 'in', 'falling'), //blue
      pir = new Gpio(16, 'in', 'both'), //orange
      buzzer = new Gpio(25, 'out'), //purple
      button = new Gpio(12, 'in', 'both'), //white
      led = new Gpio(17, 'out'), //black
      exit = function() {
        buzzer.unexport();
        button.unexport();
        backDoor.unexport();
        pir.unexport();
        led.unexport();
        process.exit();
    }

  return {
    soundAlarm: function(){
      buzzer.write(1);
    },
    stopAlarm: function(){
      buzzer.write(0);
    },
    beepBeep: function(){
      var iv = setInterval(function(){
        led.writeSync(led.readSync() === 0 ? 1 : 0)
      }, 500);
      setTimeout(function() {
        clearInterval(iv); // Stop blinking
        led.writeSync(0);  // Turn LED off.
        led.unexport();    // Unexport GPIO and free resources
      }, 1000);
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
      });
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
});



 
process.on('SIGINT', io.exit);


module.exports = io;
