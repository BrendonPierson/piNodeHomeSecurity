var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(17, 'out'),
    button = new Gpio(18, 'in', 'both'),
    door = new Gpio(21, 'in', 'both');
 
button.watch(function(err, value) {
  if (err) exit();
  buzzer.writeSync(value);
});

var armedNoDelay = function() {
  door.watch(function(err, value) {
    if(err) exit();
    console.log(value);
    if (value === 0) {
      buzzer.writeSync(1);
    } else {
      buzzer.writeSync(0);
    }
  });
} 

armedNoDelay();


function exit() {
  buzzer.unexport();
  button.unexport();
  door.unexport();
  process.exit();
}
 
process.on('SIGINT', exit);
