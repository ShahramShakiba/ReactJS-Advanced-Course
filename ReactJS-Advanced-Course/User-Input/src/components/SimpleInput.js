import useInput from '../hooks/useInput';

export default function SimpleInput() {
  const {
    value: enteredName,
    isValid: validName,
    hasError: nameHasError,
    reset: resetName,
    handleChangeValue: handleChangeName,
    handleInputBlur: handleNameBlur,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: validEmail,
    hasError: emailHasError,
    reset: resetEmail,
    handleChangeValue: handleChangeEmail,
    handleInputBlur: handleEmailBlur,
  } = useInput((value) => value.includes('@'));

  // disabled submit btn if form is invalid
  let validForm = false;
  if (validName && validEmail) {
    validForm = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validName) {
      return;
    }

    resetEmail();
    resetName();
    console.log(enteredName, enteredEmail);
  };

  const nameInputCSS = nameHasError ? 'form-control invalid' : 'form-control';
  const emailInputCSS = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameInputCSS}>
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          onChange={handleChangeName}
          onBlur={handleNameBlur}
          value={enteredName}
        />

        {nameHasError && <p className="error-text">Please enter your Name.</p>}
      </div>

      <div className={emailInputCSS}>
        <label htmlFor="email"> Your Email </label>
        <input
          type="email"
          id="email"
          onChange={handleChangeEmail}
          onBlur={handleEmailBlur}
          value={enteredEmail}
        />

        {emailHasError && (
          <p className="error-text">Please enter a valid Email.</p>
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
