var Gpio = require('onoff').Gpio,
    backDoor = new Gpio(23, 'in', 'both'), //blue
    pir = new Gpio(16, 'in', 'both'), //orange
    buzzer = new Gpio(25, 'out'), //purple
    button = new Gpio(12, 'in', 'both'), //white
    led = new Gpio(17, 'out'); //black
      
/////////////////////  
// FUNCTIONS
/////////////////////

function soundAlarm(){
  buzzer.write(1);
  console.log("buzz On")
};

function stopAlarm(){
  buzzer.write(0);
  console.log("buzz off")
};



backDoor.watch(function(err, value){
  console.log("inside backDoor.watch function");
  if (err) exit ();
    soundAlarm();
  });
};

function armedWithDelay() {
  backDoor.watch(function(err, value){
  if (err) exit ();
  setTimeout(soundAlarm(), 10000);
  });
};

function exit() {
  buzzer.unexport();
  button.unexport();
  backDoor.unexport();
  pir.unexport();
  led.unexport();
  process.exit();
}


setTimeout(soundAlarm(), 2000);
setTimeout(stopAlarm(), 2000);
    
armedNoDelay();
 






process.on('SIGINT', exit());




 

