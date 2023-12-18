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
export default calculateDigitWidth;
//# sourceMappingURL=calculateDigitWidth.js.map