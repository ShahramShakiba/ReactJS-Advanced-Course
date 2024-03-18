import Card from './Card';
import { useCounter } from '../hooks/useCounter';

export default function BackwardCounter() {
  const { counter } = useCounter(false);

  return <Card> {counter} </Card>;
}

/* Alternative Way
 const counterFn = () => (prevCounter) => prevCounter - 1;

  const { counter } = useCounter(counterFn, 0);
*/
