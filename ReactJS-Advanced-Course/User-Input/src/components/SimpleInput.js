import { useState, useEffect } from 'react';

export default function SimpleInput() {
  const [enteredValue, setEnteredValue] = useState('');
  const [touchedValue, setTouchedValue] = useState(false);

  const validName = enteredValue.trim() !== '';
  const invalidInputName = !validName && touchedValue;
  const inputCSS = invalidInputName ? 'form-control invalid' : 'form-control';

  // Testing side-effect | set state to "false" not true
  useEffect(() => {
    if (validName) {
      console.log('Name Input Is Valid');
    }
  }, [validName]);

  const handleChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleOnFocus = (e) => {
    setTouchedValue(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouchedValue(true);

    if (!validName) {
      return;
    }

    setEnteredValue('');
    setTouchedValue(false);
    console.log(enteredValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={inputCSS}>
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          onBlur={handleOnFocus}
          value={enteredValue}
        />

        {invalidInputName && (
          <p className="error-text">Please enter your name.</p>
        )}
      </div>

      <div className="form-actions">
        <button> Submit </button>
      </div>
    </form>
  );
}

/* useRef
export default function SimpleInput() {
  const nameInput = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    console.log(enteredName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name"> Your Name </label>
        <input type="text" id="name" ref={nameInput} />
      </div>

      <div className="form-actions">
        <button> Submit </button>
      </div>
    </form>
  );
}
*/
