'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.led = exports.motion = exports.frontDoor = undefined;

var _onoff = require('onoff');

var frontDoor = exports.frontDoor = new _onoff.Gpio(21, "in", "both", { debounceTimeout: 200 });
var motion = exports.motion = new _onoff.Gpio(19, "in", "both", { debounceTimeout: 100 });
var led = exports.led = new _onoff.Gpio(26, "low");