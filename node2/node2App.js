var Gpio = require('onoff').Gpio,
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");

ref.child('arm').child('armedWithMotion').on('value', function(snapshot){
  data = snapshot.val();
  console.log("armed with motion fb", data);
  if(data) {
    motion.watch(function(err, value){
      if(err) exit();
        if(value === 1) {
          console.log("Motion detected at: ", new Date().toLocaleTimeString());
          var options = { timeZone: 'CST', timeZoneName: 'short' };
          var time = new Date().toLocaleTimeString('en-US', options);
          ref.child('sensors').child('motion').set('Motion Detected at: '+ time );
          ref.child('sensors').child('motionVal').set(1);
        } else {
          ref.child('sensors').child('motionVal').set(0);
        }
    });
  }
});


frontDoor.watch(function(err, value){
  if(err) exit();

  if(value === 1){
    ref.child('sensors').child('frontDoor').set('Closed');
    console.log("Front door closed at: ", new Date().toLocaleTimeString());
  } else {
    ref.child('sensors').child('frontDoor').set('Open');
    console.log("Front door open at: ", new Date().toLocaleTimeString());
  }
});
    
function exit() {
  frontDoor.unexport();
  motion.unexport();
  process.exit();
}

process.on('SIGINT',exit);

