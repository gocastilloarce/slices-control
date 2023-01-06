"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopPresentation = exports.startPresentation = exports.strokeLeft = exports.strokeRight = void 0;
const robotjs_1 = require("robotjs");
const strokeRight = () => {
    (0, robotjs_1.keyTap)("right");
};
exports.strokeRight = strokeRight;
const strokeLeft = () => {
    (0, robotjs_1.keyTap)("left");
};
exports.strokeLeft = strokeLeft;
const startPresentation = () => {
    (0, robotjs_1.keyTap)("f5", "control");
};
exports.startPresentation = startPresentation;
const stopPresentation = () => {
    (0, robotjs_1.keyTap)("escape");
};
exports.stopPresentation = stopPresentation;
