"use strict";
exports.__esModule = true;
var react_1 = require("react");
// Hook used to track previous value of primary number state in AnimatedCounter & individual digits in NumberColumn
var usePrevious = function (value) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
exports["default"] = usePrevious;