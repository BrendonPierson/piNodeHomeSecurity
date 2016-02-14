'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _constants = require('../utils/constants');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sensors = require('./sensors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default(_constants.FBURL);

(0, _sensors.watch)();

ref.child('security').on('value', function (snapshot) {
  var data = snapshot.val();
  (0, _sensors.light)(data.armed);
});

process.on('SIGINT', function () {
  console.log("Exiting cleanly from gpio.js at: ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  (0, _sensors.unexportPins)();
});