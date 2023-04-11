"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedCounter = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("./hooks");
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var formatForDisplay = function formatForDisplay() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return parseFloat(Math.max(number, 0)).toFixed(2).split("").reverse();
};
var DecimalColumn = function DecimalColumn() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "."));
};
var NumberColumn = function NumberColumn(_ref) {
  var digit = _ref.digit,
    delta = _ref.delta;
  var _useState = (0, _react.useState)(0),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    position = _useState2[0],
    setPosition = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    animationClass = _useState4[0],
    setAnimationClass = _useState4[1];
  var previousDigit = (0, _hooks.usePrevious)(digit);
  var columnContainer = (0, _react.useRef)();
  var setColumnToNumber = function setColumnToNumber(number) {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  };
  (0, _react.useEffect)(function () {
    return setAnimationClass(previousDigit !== digit ? delta : "");
  }, [digit, delta]);
  (0, _react.useEffect)(function () {
    return setColumnToNumber(digit);
  }, [digit]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ticker-column-container",
    ref: columnContainer
  }, /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, {
    animate: {
      y: position
    },
    className: "ticker-column ".concat(animationClass),
    onAnimationComplete: function onAnimationComplete() {
      return setAnimationClass("");
    }
  }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: num,
      className: "ticker-digit"
    }, /*#__PURE__*/_react["default"].createElement("span", null, num));
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "number-placeholder"
  }, "0"));
};
var AnimatedCounter = function AnimatedCounter(_ref2) {
  var value = _ref2.value;
  var numArray = formatForDisplay(value);
  var previousNumber = (0, _hooks.usePrevious)(value);
  var delta = null;
  if (value > previousNumber) delta = 'increase';
  if (value < previousNumber) delta = 'decrease';
  return /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, {
    layout: true,
    className: "ticker-view"
  }, numArray.map(function (number, index) {
    return number === "." ? /*#__PURE__*/_react["default"].createElement(DecimalColumn, {
      key: index
    }) : /*#__PURE__*/_react["default"].createElement(NumberColumn, {
      key: index,
      digit: number,
      delta: delta
    });
  }));
};
exports.AnimatedCounter = AnimatedCounter;