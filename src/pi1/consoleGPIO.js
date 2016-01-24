// Use if you want to test on non raspberryPi computer
var GPIO = function(){

  var buzzer = "buzzer"
    button = "button"
    door = "door"
    armed = false;

  return {
    linkTest: function(){
      console.log("GPIO module is correctly loaded");
    },
    arm: function(armDelay, enterDelay){
      console.log("armDelay", armDelay);
      console.log("enterDelay", enterDelay);
    },
    armedNoDelay: function() {
      console.log("armed no delay function fired");
    }, 
    armedWithDelay: function(){
      armed = true;
      console.log("armed with delay function fired");
    },
    disarm: function(){
      console.log("disarm function fired");
    },
    exit: function () {
      console.log("exited cleanly with the exit function");
    }
  };
};

module.exports = GPIO();
