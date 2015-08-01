var GPIO = require('./gpio');

setTimeout(GPIO.soundAlarm(), 2000);
setTimeout(GPIO.stopAlarm(), 2000);
    
GPIO.armedNoDelay();
 
process.on('SIGINT', GPIO.exit());
