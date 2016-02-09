// 'use strict'
// //http://www.arroyocode.com/raspberry-pi-nodejs-web-server-with-pm2/

// import Firebase from 'firebase'
// import { FBURL } from '../utils/constants'
// import moment from 'moment'
// import exit from '../utils/exit'
// import {
//   motion,
//   frontDoor
// } from './pinConfig'

// const ref = new Firebase(FBURL)
// const pins = [motion, frontDoor]

// frontDoor.watch((err, value) => {
//   if (err) exit()

//   ref.child('security').child('frontDoor').set(value)
//   console.log("backDoor changed to: ", value, " at ",
//     moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
// })

// // Only track motion when it is selected
// motion.watch((err, value) => {
//   if (err) exit(pins)
//   ref.child('security').child('motion').set(value)
//   if (value) 
//     ref.child('sensors').child('lastMotion')
//       .set(moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
// })

// process.on('SIGINT', () => {
//   console.log("Exiting cleanly from gpio.js at: ",
//     moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
//   exit(pins)
// })










//         ref.child('sensors').child('motionVal').set(1);
//       } else {
// :
// var Gpio = require('onoff').Gpio,
//     dhtSensor = require('./DHTsensor'),
//     tempSensor = require('ds1820-temp'),
//     timeModule = require('../time'),
//     frontDoor = new Gpio(21, 'in', 'both'),
//     motion = new Gpio(19, 'in', 'both'),
//     Firebase = require("firebase"),
//     ref = new Firebase("https://securepenning.firebaseio.com/");

// // Read initial temperature sensors and log data to firebase
// if (dhtSensor.initialize()) {
//   tempSet();
// } else {
//   console.warn('Failed to initialize dhtSensor');
// }
// // Read temp sensors at 10min interval
// setInterval(tempSet, 600000);

// // Function to read and log temperature to firebase
// function tempSet(){

//   // if (dhtSensor.initialize()) {
//     outsideDHT = dhtSensor.read();
//     console.log("outsideDHT", outsideDHT);
//     var outsideTemperature = (outsideDHT.temperature * (9/5) + 32);
//     var outsideHumidity = outsideDHT.humidity;
//     ref.child('sensors').child('tempOutside').set(outsideTemperature);
//     ref.child('sensors').child('humOutside').set(outsideHumidity);

//     tempSensor.readDevice('021500cf61ff').then(function(data){
//       console.log("insidetemp data", data.value);
//       var insideTemperature = (data.value * (9/5) + 32).toFixed(2);
//       ref.child('sensors').child('temp').set(insideTemperature);

//       var conditions = {
//         insideTemp: insideTemperature,
//         outsideTemp: outsideTemperature,
//         humidity: outsideHumidity,
//         x: timeModule.realDate()
//       }
//       ref.child('conditionsLog/'+ timeModule.dateInt()).set(conditions);
//     });
//   // } else {
//   //   console.warn('Failed to initialize dhtSensor');
//   // }
// }