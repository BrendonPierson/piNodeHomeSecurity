'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exit = require('../utils/exit');

var _exit2 = _interopRequireDefault(_exit);

var _pollAlarm = require('./pollAlarm');

var _pollAlarm2 = _interopRequireDefault(_pollAlarm);

var _pinConfig = require('./pinConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default("https://securepenning.firebaseio.com/");
var pins = [_pinConfig.buzzer, _pinConfig.led, _pinConfig.button, _pinConfig.door];

ref.child('security').on('value', function (snapshot) {
  var data = snapshot.val();
  _pinConfig.led.writeSync(data.armed);
  if (data.armed) _pinConfig.buzzer.writeSync(data.siren);
  (0, _pollAlarm2.default)(data);
});

_pinConfig.door.watch(function (err, value) {
  if (err) (0, _exit2.default)();

  ref.child('security').child('backDoor').set(value);
  console.log("backDoor changed to: ", value, " at ", (0, _moment2.default)().format("dddd, MMMM Do YYYY, h:mm:ss a"));
});

_pinConfig.button.watch(function (err, value) {
  if (err) (0, _exit2.default)();
  if (value === 0) {
    console.log("disarm push button pressed at: ", (0, _moment2.default)().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    ref.child('security').child('siren').set(0);
    ref.child('security').child('armed').set(0);
  }
});

process.on('SIGINT', function () {
  console.log("Exiting cleanly from gpio.js at: ", (0, _moment2.default)().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  (0, _exit2.default)(pins);
});