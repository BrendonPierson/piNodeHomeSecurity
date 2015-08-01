var io = require('./gpio');

setTimeout(io.soundAlarm(), 1000);
setTimeout(io.stopAlarm(), 1000);
    

 
process.on('SIGINT', io.exit);
