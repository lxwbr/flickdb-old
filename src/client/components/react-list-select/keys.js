"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var values = _interopRequire(require("lodash/object/values"));

var KEY = exports.KEY = {
	UP: 38,
	DOWN: 40,
	ESC: 27,
	ENTER: 13,
	SPACE: 32,
	J: 74,
	K: 75 };

var KEYS = exports.KEYS = values(KEY);
Object.defineProperty(exports, "__esModule", {
	value: true
});