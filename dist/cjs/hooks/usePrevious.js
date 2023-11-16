"use strict";
exports.__esModule = true;
var react_1 = require("react");
// Used to "remember" previous value of each individual digit
var usePrevious = function (value) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
exports["default"] = usePrevious;
//# sourceMappingURL=usePrevious.js.map