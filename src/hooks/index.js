import { useRef, useEffect } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  })

  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback?.current === 'function') {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id)
    }
  }, [delay]);
}

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value])
  return ref.current;
}