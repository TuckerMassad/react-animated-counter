// Adjusts width of individual narrow digits 
const calculateDigitWidth = (digit: number) => {
  switch (`${digit}`) {
    case '1':
      return '50%'
    case '7':
      return '80%'
    default:
      return '100%'
  }
}

export default calculateDigitWidth;