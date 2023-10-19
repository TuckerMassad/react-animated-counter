"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var formatForDisplay = function (number, includeDecimals) {
    return parseFloat("".concat(Math.max(number, 0))).toFixed(includeDecimals ? 2 : 0).split('').reverse();
};
exports.formatForDisplay = formatForDisplay;
