var Gpio = require('onoff').Gpio,
    tempSensor = require('ds1820-temp'),
    timeModule = require('../time'),
    temp = {},
    dhtSensor = require('./DHTsensor'),
    outsideDHT = {},
    outsideConditions = {},
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");

  if (dhtSensor.initialize()) {
    outsideDHT = dhtSensor.read();
    console.log("outsideDHT", outsideDHT);
    outsideConditions.temp = (outsideDHT.temperature * (9/5) + 32).toFixed(2);
    outsideConditions.humidity = outsideDHT.humidity;
    outsideConditions.time = timeModule.date();
    ref.child('sensors').child('tempOutside').set(outsideConditions.temp);
    ref.child('outsideLog/'+ timeModule.dateInt()).set(outsideConditions);
  } else {
    console.warn('Failed to initialize dhtSensor');
  }

setInterval(function(){

  if (dhtSensor.initialize()) {
    outsideDHT = dhtSensor.read();
    console.log("outsideDHT", outsideDHT);
    outsideConditions.temp = (outsideDHT.temperature * (9/5) + 32).toFixed(2);
    outsideConditions.humidity = outsideDHT.humidity;
    outsideConditions.time = timeModule.date();
    ref.child('sensors').child('tempOutside').set(outsideConditions.temp);
    ref.child('outsideLog/'+ timeModule.dateInt()).set(outsideConditions);
  } else {
    console.warn('Failed to initialize dhtSensor');
  }




  tempSensor.readDevice('021500cf61ff').then(function(data){
    console.log("temp data", data.value);
    temp = { 
      value: (data.value * (9/5) + 32).toFixed(2),
      time: timeModule.date()
    };
    ref.child('sensors').child('temp').set(temp.value);
    ref.child('tempLog/'+ timeModule.dateInt()).set(temp);
    temp = {};
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

