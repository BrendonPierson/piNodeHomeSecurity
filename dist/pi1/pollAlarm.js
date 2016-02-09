'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pollAlarm;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _constants = require('../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default(_constants.FBURL);

function soundSiren(data) {
  setTimeout(function () {
    ref.child('security').child('siren').set(1);
  }, data.enterDelay * 1000);
}

function pollAlarm(data) {

  if ((!data.backDoor || data.frontDoor) && data.armed) {
    soundSiren(data);
  } else if (data.armedWithMotion && data.motion) {
    soundSiren(data);
  }
}