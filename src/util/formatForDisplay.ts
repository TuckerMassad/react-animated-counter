// Creates array of digits to vertically scroll through
const formatForDisplay = (
  number: number
): string[] => {
  const parsedNumber = parseFloat(`${Math.max(number, 0)}`).toFixed();
  return parsedNumber.split('').reverse();
}

export default formatForDisplay;