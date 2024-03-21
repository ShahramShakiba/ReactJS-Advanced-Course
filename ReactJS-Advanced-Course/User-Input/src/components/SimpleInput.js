import { useState } from 'react';

export default function SimpleInput() {
  const [enteredValue, setEnteredValue] = useState('');
  const [touchedValue, setTouchedValue] = useState(false);
  // set state to "false" not true

  const validName = enteredValue.trim() !== '';
  const invalidInputName = !validName && touchedValue;
  const inputCSS = invalidInputName ? 'form-control invalid' : 'form-control';

  // disabled submit btn if form is invalid
  let validForm = false;
  if (validName) {
    validForm = true;
    console.log('Name Input Is Valid');
  }

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
        <button disabled={!validForm}> Submit </button>
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
