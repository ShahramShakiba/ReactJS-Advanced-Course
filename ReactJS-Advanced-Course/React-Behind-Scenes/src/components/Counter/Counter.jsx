import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

const isPrime = (number) => {
  log('Calculating if is prime number', 2, 'other');
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

export default function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
  const [counter, setCounter] = useState(initialCount);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong> {initialCount} </strong>. It{' '}
        <strong> is {initialCountIsPrime ? 'a' : 'not a'} </strong> prime
        number.
      </p>

      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>

        <CounterOutput value={counter} />

        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}

/* memo() 
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)

const Counter = memo(function Counter({ initialCount }) {
  ....

  .....

  .....

  return (
    <section className="counter">
    .....
    </section>
  );
});

export default Counter;

* lets you skip re-rendering a component when its props are unchanged.
- This can be used to optimize the performance of your components. 

  - memo() compares prop values
?  OLD PROPS VALUE  🔛  NEW PROPS VALUES
   - Equal :
     Counter-Component function WILL NOT execute

    - Counter-Component will re-executed if :
      . initialCount changed
      . or internal state changed


? DO NOT Overuse memo() :
  - use it as high up in the component tree as possible
    . blocking a component execution there will also block all child component executions

  - Checking props with memo "costs performance"
    . don't wrap it around all your components - it will just add a lot of unnecessary checks

  - DO NOT USE it on components where props will change frequently
    . like SearchBar / InputField etc.
    . memo() would just perform a meaningless check in such cases(which costs performance)
*/

/* useCallback( fn, [] )
  - to avoid of recreation of a function if you have a function as a dependency of useEffect

  - needed in conjunction with memo to avoid unnecessary re-executions

  [] here dependency is setCounter which is a state updating fn and state-updating fn are guaranteed to never change by react, that's why we don't need to add them to this dependency array.
*/

/* useMemo ()
  - is wrapped around normal fn that are executed in Component-Functions to prevent their execution

  - it should be used if you have a Complex Calculation that you want to prevent

  - useMemo is a React Hook that lets you cache the result of a calculation between re-renders. |  to cache a calculation between re-renders

?  const cachedValue = useMemo(calculateValue, dependencies)
? const initialCountIsPrime = useMemo(
?    () => isPrime(initialCount),
?    [initialCount]
?  );
    - isPrime only gets re-executed if initialCount changed
    - it won't get executed if the "counter-state" changed
*/
