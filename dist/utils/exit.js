"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exit;
function exit(pins) {
  console.log("Exiting cleanly from program.");
  pins.forEach(function (pin) {
    return pin.unexport();
  });
  process.exit();
}