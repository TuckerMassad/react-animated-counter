"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AnimatedCounter = require("./AnimatedCounter");
var AnimatedCounter = function AnimatedCounter(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    _ref$fontSize = _ref.fontSize,
    fontSize = _ref$fontSize === void 0 ? '18px' : _ref$fontSize,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'black' : _ref$color,
    _ref$incrementColor = _ref.incrementColor,
    incrementColor = _ref$incrementColor === void 0 ? '#32cd32' : _ref$incrementColor,
    _ref$decrementColor = _ref.decrementColor,
    decrementColor = _ref$decrementColor === void 0 ? '#fe6862' : _ref$decrementColor,
    _ref$includeDecimals = _ref.includeDecimals,
    includeDecimals = _ref$includeDecimals === void 0 ? true : _ref$includeDecimals;
  return /*#__PURE__*/React.createElement(_AnimatedCounter.AnimatedCounter, {
    value: value,
    fontSize: fontSize,
    color: color,
    incrementColor: incrementColor,
    decrementColor: decrementColor,
    includeDecimals: includeDecimals
  });
};
var _default = exports.default = AnimatedCounter;