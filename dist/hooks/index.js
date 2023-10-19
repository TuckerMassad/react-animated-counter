"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
// Used to "remember" previous value of each individual digit
var usePrevious = function (value) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
exports.usePrevious = usePrevious;
