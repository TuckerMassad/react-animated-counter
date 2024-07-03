"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Creates array of digits to vertically scroll through
var formatForDisplay = function (number) {
    var parsedNumber = parseFloat("".concat(Math.max(number, 0))).toFixed();
    return parsedNumber.split('').reverse();
};
exports.default = formatForDisplay;
//# sourceMappingURL=formatForDisplay.js.map