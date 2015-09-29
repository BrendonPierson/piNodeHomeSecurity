var Gpio = require('onoff').Gpio,
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");


motion.watch(function(err, value){
  if(err) exit();
    if(value === 1) {
      var options = { timeZone: 'UTC', timeZoneName: 'short' };
      var time = new Date().toLocaleTimeString('en-US', options);
      ref.child('motion').set('Motion Detected at: '+ time );
      ref.child('motionVal').set(1);
    } else {
      ref.child('motionVal').set(0);
    }
});


frontDoor.watch(function(err, value){
  if(err) exit();

  if(value === 1){
    ref.child('frontDoor').set('Closed');
  } else {
    ref.child('frontDoor').set('Open');
  }
});
    
function exit() {
  frontDoor.unexport();
  motion.unexport();
  process.exit();
}

process.on('SIGINT',exit);

