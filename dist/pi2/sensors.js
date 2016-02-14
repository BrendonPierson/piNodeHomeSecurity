'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indoorThermometer = undefined;
exports.watch = watch;
exports.light = light;
exports.unexportPins = unexportPins;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _constants = require('../utils/constants');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exit = require('../utils/exit');

var _exit2 = _interopRequireDefault(_exit);

var _thermDs18b = require('therm-ds18b20');

var _thermDs18b2 = _interopRequireDefault(_thermDs18b);

var _pinConfig = require('./pinConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default(_constants.FBURL);
var pins = [_pinConfig.led, _pinConfig.frontDoor, _pinConfig.motion];

var indoorThermometer = exports.indoorThermometer = new _thermDs18b2.default({
  // https://github.com/chamerling/ds18b20
  id: '28-021500cf61ff', // device id
  interval: 600000 // interval in ms, 600000ms = 10min
}).on('init', function () {
  console.log('inited');
}).on('data', function (data) {
  var date = Date.now();
  data.F = data.C * (9 / 5) + 32;
  if (data) ref.child('sensors').child('indoorTemp').child(date).set({ data: data });
}).on('error', function (error) {
  console.log(error);
});

function watch() {

  _pinConfig.frontDoor.watch(function (err, value) {
    if (err) (0, _exit2.default)(pins);

    ref.child('security').child('frontDoor').set(value);
    console.log("frontDoor changed to: ", value, " at ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });

  _pinConfig.motion.watch(function (err, value) {
    if (err) (0, _exit2.default)(pins);

    ref.child('security').child('motion').set(value);
    console.log("motion changed to: ", value, " at ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });
}

function light(armed) {
  _pinConfig.led.writeSync(armed);
}

function unexportPins() {
  (0, _exit2.default)(pins);
}