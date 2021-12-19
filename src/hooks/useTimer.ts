import { useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useTimer(callback: () => void, duration: number = 1000) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (duration !== null) {
      let id = setInterval(tick, duration);
      return () => clearInterval(id);
    }
  }, [duration]);
}