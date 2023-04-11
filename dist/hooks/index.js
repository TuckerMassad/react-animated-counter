"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevious = exports.useInterval = void 0;
var _react = require("react");
var useInterval = function useInterval(callback, delay) {
  var savedCallback = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    savedCallback.current = callback;
  });
  (0, _react.useEffect)(function () {
    var tick = function tick() {
      if (typeof (savedCallback === null || savedCallback === void 0 ? void 0 : savedCallback.current) === 'function') {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      var id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
};
exports.useInterval = useInterval;
var usePrevious = function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};
exports.usePrevious = usePrevious;