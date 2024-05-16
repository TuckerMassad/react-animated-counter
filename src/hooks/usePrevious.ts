import { useRef, useEffect } from 'react';

// Hook used to track previous value of primary number state in AnimatedCounter & individual digits in NumberColumn
const usePrevious = (value: number | null) => {
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value])
  return ref.current;
}

export default usePrevious;