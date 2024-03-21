import useInputs from '../hooks/useInputs';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

export default function BasicForm() {
  const {
    value: nameValue,
    isValid: validName,
    error: nameHasError,
    reset: resetName,
    handleChange: handleChangeName,
    handleBlur: blurName,
  } = useInputs(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: validLastName,
    error: lastNameHasError,
    reset: resetLastName,
    handleChange: handleChangeLastName,
    handleBlur: blurLastName,
  } = useInputs(isNotEmpty);

  const {
    value: emailValue,
    isValid: validEmail,
    error: emailHasError,
    reset: resetEmail,
    handleChange: handleChangeEmail,
    handleBlur: blurEmail,
  } = useInputs(isEmail);

  let validForm = false;
  if (validName && validLastName && validEmail) {
    validForm = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validForm) {
      return;
    }

    resetName();
    resetLastName();
    resetEmail();
    console.log(nameValue, lastNameValue, emailValue);
  };

  const nameCSS = nameHasError ? 'form-control invalid' : 'form-control';
  const lastNameCSS = lastNameHasError
    ? 'form-control invalid'
    : 'form-control';
  const emailCSS = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <div className={nameCSS}>
          <label htmlFor="name"> First Name </label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={handleChangeName}
            onBlur={blurName}
          />

          {nameHasError && (
            <p className="error-text">Please enter your Name.</p>
          )}
        </div>

        <div className={lastNameCSS}>
          <label htmlFor="lastName"> Last Name </label>
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={handleChangeLastName}
            onBlur={blurLastName}
          />

          {lastNameHasError && (
            <p className="error-text">Please enter your Last Name.</p>
          )}
        </div>
      </div>

      <div className={emailCSS}>
        <label htmlFor="email"> E-Mail Address </label>
        <input
          type="email"
          id="email"
          value={emailValue}
          onChange={handleChangeEmail}
          onBlur={blurEmail}
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
