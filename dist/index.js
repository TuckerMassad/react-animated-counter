"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedCounter = void 0;
var _react = _interopRequireDefault(require("react"));
var _AnimatedCounter = require("./AnimatedCounter");
var Main = function Main(_ref) {
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
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_AnimatedCounter.AnimatedCounter, {
    value: value,
    fontSize: fontSize,
    color: color,
    incrementColor: incrementColor,
    decrementColor: decrementColor,
    includeDecimals: includeDecimals
  }));
};
exports.AnimatedCounter = Main;