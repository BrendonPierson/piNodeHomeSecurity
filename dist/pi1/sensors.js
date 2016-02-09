'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;
exports.light = light;
exports.buzz = buzz;
exports.unexportPins = unexportPins;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _constants = require('../utils/constants');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exit = require('../utils/exit');

var _exit2 = _interopRequireDefault(_exit);

var _pinConfig = require('./pinConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default(_constants.FBURL);
var pins = [_pinConfig.buzzer, _pinConfig.led, _pinConfig.button, _pinConfig.door];

function watch() {
  _pinConfig.door.watch(function (err, value) {
    if (err) (0, _exit2.default)(pins);

    ref.child('security').child('backDoor').set(value ? 0 : 1);
    console.log("backDoor changed to: ", value, " at ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });

  _pinConfig.button.watch(function (err, value) {
    if (err) (0, _exit2.default)(pins);
    if (value === 0) {
      console.log("disarm push button pressed at: ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
      ref.child('security').child('armed').set(0, function (error) {
        if (error) {
          console.log("error", error);
        } else {
          ref.child('security').child('siren').set(0);
        }
      });
    }
  });
}

function light(data) {
  _pinConfig.led.writeSync(data.armed);
}

function buzz(data) {
  _pinConfig.buzzer.writeSync(data.siren);
}

function unexportPins() {
  (0, _exit2.default)(pins);
}