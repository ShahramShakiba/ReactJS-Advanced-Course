import { useState } from 'react';
// import { useRef } from 'react';

export default function SimpleInput() {
  const [enteredValue, setEnteredValue] = useState('');

  // const invalidInput = enteredValue === '';
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (invalidInput) {
    //   return;
    // }

    console.log(enteredValue);
    setEnteredValue('');
  };

  const handleChange = (e) => {
    setEnteredValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={enteredValue}
        />

        {/* {invalidInput && (
          <div>
            <p className="error-text">Please enter your name.</p>
          </div>
        )} */}
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
