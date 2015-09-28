var GPIO = function(){

  var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(17, 'out'),
    button = new Gpio(18, 'in', 'both'),
    door = new Gpio(21, 'in', 'both'),
    armed = false;

  function exit() {
    buzzer.unexport();
    button.unexport();
    door.unexport();
    process.exit();
  }
      
  return {
    arm: function(armDelay, enterDelay){
      armed = true;
      setTimeout(door.watch(function(err, value){
        if(err) exit();
        console.log(value);
        if (value === 0) {
          console.log("Inside value===0 if statement");
          setTimeout(function(){
            console.log("inside timeout function");
            if(armed){
              console.log("inside armed if statement");
              buzzer.writeSync(1);
              // Write to fb siren on
            }
          }, enterDelay * 1000);
        } 
      }), armDelay * 1000)
    },
    disarm: function(){
      console.log("disarm function fired");
      door.unwatch();
      armed = false;
      buzzer.writeSync(0);
    },
    exit: function () {
      console.log("exited cleanly with the exit function");
      exit();
    }
  };
};

module.exports = GPIO();
