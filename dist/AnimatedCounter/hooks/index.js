"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevious = void 0;
var _react = require("react");
// Used to "remember" previous value of each individual digit
var usePrevious = function usePrevious(value) {
  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};
exports.usePrevious = usePrevious;