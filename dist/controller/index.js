"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strokeLeft = exports.strokeRight = void 0;
const robot = require("robotjs");
const strokeRight = () => {
    robot.keyTap("right");
};
exports.strokeRight = strokeRight;
const strokeLeft = () => {
    robot.keyTap("left");
};
exports.strokeLeft = strokeLeft;
