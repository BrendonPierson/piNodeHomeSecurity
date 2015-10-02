var Gpio = require('onoff').Gpio,
    tempSensor = require('ds1820-temp'),
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");


setInterval(function(){
  tempSensor.readDevice('021500cf61ff').then(function(data){
    console.log("temp data", data.value);
    var temp = data.value * (9/5) + 32;
    ref.child('sensors').child('temp').set(temp);
  });
}, 600000);

var time = new Date().getTime();
          var offsetTime =time -  (5 * 60 * 60 * 1000); 
          console.log('Current Time: '+ new Date(offsetTime).toString());

// Only track motion when it is selected
ref.child('arm').child('armedWithMotion').on('value', function(snapshot){
  data = snapshot.val();
  console.log("armed with motion fb", data);
  if(data) {
    motion.watch(function(err, value){
      if(err) exit();
        if(value === 1) {
          var time = new Date().getTime();
          var offsetTime = (5 * 60 * 60 * 1000) + time; 
          ref.child('sensors').child('motion').set('Motion Detected at: '+ new Date(offsetTime).toString());
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

