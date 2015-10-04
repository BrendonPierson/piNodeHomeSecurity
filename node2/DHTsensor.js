// Temperature/Humidity DHT11
var sensor = function(){
  var sensorLib = require('node-dht-sensor');

  return {
    initialize: function () {
      // Sensor type = 11, pin = 18
      return sensorLib.initialize(11, 18);
    },
    read: function () {
      var readout = sensorLib.read();
      // console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
        // 'humidity: ' + readout.humidity.toFixed(2) + '%');
      return readout;
    }
  }; 
};
module.exports = sensor();