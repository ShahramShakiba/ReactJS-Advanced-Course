import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

export default function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  const handleSetCount = (newCount) => {
    setChosenCount(newCount);
  };

  return (
    <>
      <Header />

      <main>
        <ConfigureCounter onSet={handleSetCount} />

        {/* key: for resting component */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

/* Virtual DOM
React checks for necessary DOM updates via a "Virtual DOM"
  - It creates & Compares virtual DOM snapshots to find out which parts of the rendered UI need to be updated

  1. Creating a " Component Tree"

  2. Creating a "Virtual Snapshot" of the Target HTML Code

  3. Compare New Virtual DOM Snapshot to Previous(old) Virtual DOM Snapshot

  4. Identify & Apply Changes to the "Real DOM"
*/

/* key
    <Counter key={chosenCount} initialCount={chosenCount} />

    - we are using "key" here to set-counter-input into counter-output
    
    - with "key" you could say React throe away old component instance and then recreate it
*/