"use strict";
exports.__esModule = true;
// Creates array of digits to vertically scroll through
var formatForDisplay = function (number, includeDecimals, decimalPrecision) {
    var decimalCount = includeDecimals ? decimalPrecision : 0;
    return parseFloat("".concat(Math.max(number, 0))).toFixed(decimalCount).split('').reverse();
};
exports["default"] = formatForDisplay;
//# sourceMappingURL=formatForDisplay.js.map