"use strict";
exports.__esModule = true;
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
exports["default"] = calculateDigitWidth;