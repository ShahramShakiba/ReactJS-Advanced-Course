import { useState } from 'react';
// import { useRef } from 'react';

export default function SimpleInput() {
  const [enteredValue, setEnteredValue] = useState('');
  const [validValue, setValidValue] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidInput = enteredValue.trim() === '';
    if (invalidInput) {
      setValidValue(false);
      return;
    }

    console.log(enteredValue);
    setEnteredValue('');
  };

  const handleChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputCSS = validValue ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={handleSubmit}>
      <div className={inputCSS}>
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={enteredValue}
        />

        {!validValue && <p className="error-text">Please enter your name.</p>}
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
