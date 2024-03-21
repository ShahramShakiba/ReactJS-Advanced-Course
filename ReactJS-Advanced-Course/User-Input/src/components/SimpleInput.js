import { useState, useEffect } from 'react';
// import { useRef } from 'react';

export default function SimpleInput() {
  const [enteredValue, setEnteredValue] = useState('');
  // Validation
  const [validValue, setValidValue] = useState(false);
  // Touched
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  useEffect(() => {
    if (validValue) {
      console.log('Name Input Is Valid');
    }
  }, [validValue]);

  const handleChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleOnFocus = (e) => {
    setEnteredValueTouched(true);

    if (enteredValue.trim() === '') {
      setValidValue(false);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnteredValueTouched(true);

    if (enteredValue.trim() === '') {
      setValidValue(false);
      return;
    }

    setEnteredValueTouched(false);
    setEnteredValue('');
    console.log(enteredValue);
  };

  const invalidInput = !validValue && enteredValueTouched;
  const inputCSS = invalidInput ? 'form-control invalid' : 'form-control';

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

        {invalidInput && <p className="error-text">Please enter your name.</p>}
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
