var Gpio = require('onoff').Gpio,
    tempSensor = require('ds1820-temp'),
    timeModule = require('./time'),
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");


setInterval(function(){
  tempSensor.readDevice('021500cf61ff').then(function(data){
    console.log("temp data", data.value);
    var temp = { 
      value: data.value * (9/5) + 32,
      time: timeModule.date()
    }
    ref.child('sensors').child('temp').set(temp.value);
    ref.child('tempLog').push(temp);
  });
}, 600000);

// Only track motion when it is selected
ref.child('arm').child('armedWithMotion').on('value', function(snapshot){
  data = snapshot.val();
  console.log("armed with motion fb", data);
  if(data) {
    motion.watch(function(err, value){
      if(err) exit();
        if(value === 1) {
          ref.child('sensors').child('motion').set('Motion Detected at: '+ timeModule.date());
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
    console.log("Front door closed at: ", timeModule.localTime());
  } else {
    ref.child('sensors').child('frontDoor').set('Open');
    console.log("Front door open at: ", timeModule.localTime());
  }
});
    
function exit() {
  frontDoor.unexport();
  motion.unexport();
  process.exit();
}

process.on('SIGINT',exit);

