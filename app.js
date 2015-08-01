var GPIO = require('./gpio');

setTimeout(GPIO.soundAlarm, 1000);
setTimeout(GPIO.stopAlarm, 1000);
    

 
process.on('SIGINT', GPIO.exit);
