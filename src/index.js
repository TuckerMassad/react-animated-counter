import { AnimatedCounter as AnimatedCounterWrapper } from './AnimatedCounter';

const AnimatedCounter = ({
  value = 0,
  fontSize = '18px',
  color = 'black',
  incrementColor = '#32cd32',
  decrementColor = '#fe6862',
  includeDecimals = true,
}) => (
  <AnimatedCounterWrapper
    value={value}
    fontSize={fontSize}
    color={color}
    incrementColor={incrementColor}
    decrementColor={decrementColor}
    includeDecimals={includeDecimals}
  />
)

export default AnimatedCounter;