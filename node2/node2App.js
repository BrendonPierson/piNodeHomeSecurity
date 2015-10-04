var Gpio = require('onoff').Gpio,
    tempSensor = require('ds1820-temp'),
    timeModule = require('../time'),
    dhtSensor = require('./DHTsensor'),
    frontDoor = new Gpio(21, 'in', 'both'),
    motion = new Gpio(19, 'in', 'both'),
    Firebase = require("firebase"),
    ref = new Firebase("https://securepenning.firebaseio.com/");

tempSet();
setInterval(tempSet, 600000);

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

function tempSet(){
  if (dhtSensor.initialize()) {
    outsideDHT = dhtSensor.read();
    console.log("outsideDHT", outsideDHT);
    var outsideTemperature = (outsideDHT.temperature * (9/5) + 32).toFixed(2);
    var outsideHumidity = outsideDHT.humidity;
    ref.child('sensors').child('tempOutside').set(outsideTemperature);
    ref.child('sensors').child('humOutside').set(outsideHumidity);

    tempSensor.readDevice('021500cf61ff').then(function(data){
      console.log("insidetemp data", data.value);
      var insideTemperature = (data.value * (9/5) + 32).toFixed(2);
      ref.child('sensors').child('temp').set(insideTemperature);

      var conditions = {
        insideTemp: insideTemperature,
        outsideTemp: outsideTemperature,
        humidity: outsideHumidity,
        x: timeModule.realDate()
      }
      ref.child('conditionsLog/'+ timeModule.dateInt()).set(conditions);      
    });    
  } else {
    console.warn('Failed to initialize dhtSensor');
  }
}


process.on('SIGINT',exit);

