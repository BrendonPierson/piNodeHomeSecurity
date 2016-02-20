"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  client.messages.create({
    body: "SOMEONE HAS TRIPPED THE ALARM!!!!!!!!!",
    to: process.env.MY_CELL,
    from: process.env.T_CELL
  }, function (err, message) {
    console.log("err", err);
    console.log("message", message);
  });

  client.messages.create({
    body: "SOMEONE HAS TRIPPED THE ALARM!!!!!!!!!",
    to: process.env.ASH_CELL,
    from: process.env.T_CELL
  }, function (err, message) {
    console.log("err", err);
    console.log("message", message);
  });
};

var _twilio = require("twilio");

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;

var client = new _twilio2.default.RestClient(accountSid, authToken);