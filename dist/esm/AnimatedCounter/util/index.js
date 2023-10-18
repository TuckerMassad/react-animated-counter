// Adjusts width of individual narrow digits 
export var calculateDigitWidth = function (digit) {
    switch ("".concat(digit)) {
        case '1':
            return '50%';
        case '7':
            return '80%';
        default:
            return '100%';
    }
};
// Creates array of digits to vertically scroll through
export var formatForDisplay = function (number, includeDecimals) {
    return parseFloat("".concat(Math.max(number, 0))).toFixed(includeDecimals ? 2 : 0).split('').reverse();
};
//# sourceMappingURL=index.js.map