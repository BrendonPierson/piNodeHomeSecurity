'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pollAlarm;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default("https://securepenning.firebaseio.com/");

function pollAlarm(data) {

  if (data.backDoor || data.frontDoor && data.armed) {
    setTimeout(function () {
      return ref.child('security').child('siren').set(1);
    });
  } else if (data.armedWithMotion && data.motion) {
    setTimeout(function () {
      return ref.child('security').child('siren').set(1);
    });
  }
}