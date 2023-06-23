import { useRef, useEffect } from 'react';

// Used to "remember" previous value of each individual digit
export const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  }, [value])
  return ref.current;
}