"use strict";
exports.__esModule = true;
exports.formatForDisplay = exports.calculateDigitWidth = void 0;
// Adjusts width of individual narrow digits 
var calculateDigitWidth = function (digit) {
    switch ("".concat(digit)) {
        case '1':
            return '50%';
        case '7':
            return '80%';
        default:
            return '100%';
    }
};
exports.calculateDigitWidth = calculateDigitWidth;
// Creates array of digits to vertically scroll through
var formatForDisplay = function (number, includeDecimals, decimalPrecision) {
    var decimalCount = includeDecimals ? decimalPrecision : 0;
    return parseFloat("".concat(Math.max(number, 0))).toFixed(decimalCount).split('').reverse();
};
exports.formatForDisplay = formatForDisplay;
//# sourceMappingURL=index.js.map