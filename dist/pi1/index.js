'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _constants = require('../utils/constants');

var _auth = require('../utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _pollAlarm = require('./pollAlarm');

var _pollAlarm2 = _interopRequireDefault(_pollAlarm);

var _sensors = require('./sensors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default(_constants.FBURL);
(0, _auth2.default)(ref);
(0, _sensors.watch)();

ref.child('security').on('value', function (snapshot) {
  var data = snapshot.val();
  (0, _sensors.light)(data.armed);
  (0, _sensors.buzz)(data.siren);
  (0, _pollAlarm2.default)(data);
});

process.on('SIGINT', function () {
  console.log("Exiting cleanly from gpio.js at: ", (0, _moment2.default)().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  (0, _sensors.unexportPins)();
});