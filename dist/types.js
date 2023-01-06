"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationActions = exports.ApiActions = exports.KeyActions = void 0;
var KeyActions;
(function (KeyActions) {
    KeyActions["RIGHT"] = "right";
    KeyActions["LEFT"] = "left";
})(KeyActions = exports.KeyActions || (exports.KeyActions = {}));
var ApiActions;
(function (ApiActions) {
    ApiActions["LOGIN"] = "login";
    ApiActions["KEYACTION"] = "key";
    ApiActions["PRESENTATIONACTION"] = "presentation";
})(ApiActions = exports.ApiActions || (exports.ApiActions = {}));
var PresentationActions;
(function (PresentationActions) {
    PresentationActions["START"] = "start";
    PresentationActions["STOP"] = "stop";
})(PresentationActions = exports.PresentationActions || (exports.PresentationActions = {}));
