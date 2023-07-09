import { useEffect, useRef } from 'react';

type Callback = () => void;

export const useInterval = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
