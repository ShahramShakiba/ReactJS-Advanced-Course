import { useEffect, useState } from 'react';

export function useCounter(forwards = true) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return { counter };
}

/* Alternative Way
export function useCounter(counterFn, initialValue) {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counterFn());
    }, 1000);

    return () => clearInterval(interval);
  }, [counterFn]);

  return { counter };
}
*/
