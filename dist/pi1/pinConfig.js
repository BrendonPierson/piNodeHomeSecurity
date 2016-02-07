'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.motion = exports.door = exports.button = exports.led = exports.buzzer = undefined;

var _onoff = require('onoff');

var buzzer = exports.buzzer = new _onoff.Gpio(17, "low");
var led = exports.led = new _onoff.Gpio(26, "low");
var button = exports.button = new _onoff.Gpio(18, "in", "both");
var door = exports.door = new _onoff.Gpio(21, "in", "both", { debounceTimeout: 200 });
var motion = exports.motion = new _onoff.Gpio(19, "in", "both", { debounceTimeout: 100 });