"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _framerMotion = require("framer-motion");
var _hooks = require("./hooks");
require("./animatedCounterStyles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Adjusts width of individual narrow digits 
var calculateDigitWidth = function calculateDigitWidth(digit) {
  switch (digit) {
    case '1':
      return '50%';
    case '7':
      return '80%';
    default:
      return '100%';
  }
};

// Creates array of digits to vertically scroll through
var formatForDisplay = function formatForDisplay(number, includeDecimals) {
  return parseFloat(Math.max(number, 0)).toFixed(includeDecimals ? 2 : 0).split('').reverse();
};

// Render decimals
var DecimalColumn = function DecimalColumn(_ref) {
  var fontSize = _ref.fontSize,
    color = _ref.color;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: fontSize,
      lineHeight: fontSize,
      color: color
    }
  }, ".");
};

// Render an individual number
var NumberColumn = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var digit = _ref2.digit,
    delta = _ref2.delta,
    fontSize = _ref2.fontSize,
    color = _ref2.color,
    incrementColor = _ref2.incrementColor,
    decrementColor = _ref2.decrementColor;
  var _useState = (0, _react.useState)(0),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    position = _useState2[0],
    setPosition = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    animationClass = _useState4[0],
    setAnimationClass = _useState4[1];
  var previousDigit = (0, _hooks.usePrevious)(digit);
  var columnContainer = (0, _react.useRef)(null);
  var setColumnToNumber = (0, _react.useCallback)(function (number) {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  }, []);
  (0, _react.useEffect)(function () {
    return setAnimationClass(previousDigit !== digit ? delta : '');
  }, [digit, delta]);
  (0, _react.useEffect)(function () {
    return setColumnToNumber(digit);
  }, [digit, setColumnToNumber]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ticker-column-container",
    ref: columnContainer,
    style: {
      fontSize: fontSize,
      lineHeight: fontSize,
      color: color,
      height: 'auto',
      '--increment-color': incrementColor,
      '--decrement-color': decrementColor
    }
  }, /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, {
    animate: {
      x: 0,
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
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        fontSize: fontSize,
        lineHeight: fontSize,
        color: color,
        width: calculateDigitWidth(num)
      }
    }, num));
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "number-placeholder"
  }, "0"));
}, function (prevProps, nextProps) {
  return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta;
});

// Main component
var AnimatedCounter = function AnimatedCounter(_ref3) {
  var value = _ref3.value,
    fontSize = _ref3.fontSize,
    color = _ref3.color,
    incrementColor = _ref3.incrementColor,
    decrementColor = _ref3.decrementColor,
    includeDecimals = _ref3.includeDecimals;
  var numArray = formatForDisplay(value, includeDecimals);
  var previousNumber = (0, _hooks.usePrevious)(value);
  var delta = null;
  if (value > previousNumber) delta = 'increase';
  if (value < previousNumber) delta = 'decrease';
  return /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, {
    layout: true,
    className: "ticker-view"
  }, numArray.map(function (number, index) {
    return number === "." ? /*#__PURE__*/_react["default"].createElement(DecimalColumn, {
      key: index,
      fontSize: fontSize,
      color: color
    }) : /*#__PURE__*/_react["default"].createElement(NumberColumn, {
      key: index,
      digit: number,
      delta: delta,
      fontSize: fontSize,
      incrementColor: incrementColor,
      decrementColor: decrementColor,
      includeDecimals: includeDecimals
    });
  }));
};
var _default = AnimatedCounter;
exports["default"] = _default;