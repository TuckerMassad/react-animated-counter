"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedCounter = void 0;
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-int.js");
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../hooks");
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const formatForDisplay = function formatForDisplay() {
  let number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return parseFloat(Math.max(number, 0)).toFixed(2).split("").reverse();
};
const DecimalColumn = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, "."));
};
const NumberColumn = _ref => {
  let {
    digit,
    delta
  } = _ref;
  const [position, setPosition] = (0, _react.useState)(0);
  const [animationClass, setAnimationClass] = (0, _react.useState)(null);
  const previousDigit = (0, _hooks.usePrevious)(digit);
  const columnContainer = (0, _react.useRef)();
  const setColumnToNumber = number => {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  };
  (0, _react.useEffect)(() => setAnimationClass(previousDigit !== digit ? delta : ""), [digit, delta]);
  (0, _react.useEffect)(() => setColumnToNumber(digit), [digit]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ticker-column-container",
    ref: columnContainer
  }, /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    animate: {
      y: position
    },
    className: "ticker-column ".concat(animationClass),
    onAnimationComplete: () => setAnimationClass("")
  }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => /*#__PURE__*/_react.default.createElement("div", {
    key: num,
    className: "ticker-digit"
  }, /*#__PURE__*/_react.default.createElement("span", null, num)))), /*#__PURE__*/_react.default.createElement("span", {
    className: "number-placeholder"
  }, "0"));
};
const AnimatedCounter = _ref2 => {
  let {
    value
  } = _ref2;
  const numArray = formatForDisplay(value);
  const previousNumber = (0, _hooks.usePrevious)(value);
  let delta = null;
  if (value > previousNumber) delta = 'increase';
  if (value < previousNumber) delta = 'decrease';
  return /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    layout: true,
    className: "icker-view"
  }, numArray.map((number, index) => number === "." ? /*#__PURE__*/_react.default.createElement(DecimalColumn, {
    key: index
  }) : /*#__PURE__*/_react.default.createElement(NumberColumn, {
    key: index,
    digit: number,
    delta: delta
  })));
};
exports.AnimatedCounter = AnimatedCounter;