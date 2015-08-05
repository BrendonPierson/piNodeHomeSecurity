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
    buttonTest: function() {
      button.watch(
        function(err, value) {
          if (err) exit();
          buzzer.writeSync(value);
        }
      );
    },
    linkTest: function(){
      console.log("GPIO module is correctly loaded");
    },
    armedNoDelay: function() {
      console.log("armed no delay function fired");
      door.watch(function(err, value) {
        if(err) exit();
        console.log(value);
        if (value === 0) {
          buzzer.writeSync(1);
        } 
      }
      );
    }, 
    armedWithDelay: function(){
      armed = true;
      console.log("armed with delay function fired");
      door.watch(function(err, value){
        if(err) exit();
        console.log(value);
        setTimeout(function(){
          if (value === 0 && armed) {
          buzzer.writeSync(1);
          } 
        }
        ,10000);
      });
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
