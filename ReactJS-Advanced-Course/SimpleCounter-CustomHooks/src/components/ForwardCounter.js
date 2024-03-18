import Card from './Card';
import { useCounter } from '../hooks/useCounter';

export default function ForwardCounter() {
  const { counter } = useCounter();

  return <Card> {counter} </Card>;
}

/* Alternative Way
const counterFn = () => (prevCounter) => prevCounter + 1;

  const { counter } = useCounter(counterFn, 0);
*/
