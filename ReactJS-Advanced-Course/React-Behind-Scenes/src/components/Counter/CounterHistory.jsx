import { useState } from 'react';

import { log } from '../../log.js';

const HistoryItem = ({ count }) => {
  // Gets render like this:  --- <HistoryItem /> rendered
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
};

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
