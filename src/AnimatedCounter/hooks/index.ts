import { useRef, useEffect } from 'react';

// Used to "remember" previous value of each individual digit
export const usePrevious = (value: number | null) => {
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value])
  return ref.current;
}