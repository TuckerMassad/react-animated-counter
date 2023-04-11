"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedCounter = void 0;
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../hooks");
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    _useState2 = _slicedToArray(_useState, 2),
    position = _useState2[0],
    setPosition = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
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
    className: "icker-view"
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