// Adjusts width of individual narrow digits 
export const calculateDigitWidth = (digit: number) => {
  switch (`${digit}`) {
    case '1':
      return '50%'
    case '7':
      return '80%'
    default:
      return '100%'
  }
}

// Creates array of digits to vertically scroll through
export const formatForDisplay = (number: number, includeDecimals: boolean): string[] => {
  return parseFloat(`${Math.max(number, 0)}`).toFixed(includeDecimals ? 2 : 0).split('').reverse();
}
