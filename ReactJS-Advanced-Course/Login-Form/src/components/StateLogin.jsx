import { useState } from 'react';

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  /* Validation on every-keystroke: in this way is too early
  const invalidEmail =
    enteredValues.email !== '' && !enteredValues.email.includes('@'); 
  */
  // Validating on losing focus
  const invalidEmail = didEdit.email && !enteredValues.email.includes('@');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(enteredValues);

    // resetting inputs
    setEnteredValues({
      email: '',
      password: '',
    });
    setDidEdit({
      email: false,
      password: false,
    });
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    // disappear the error message when user starts typing again
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  };

  // Validating on losing focus
  const handleInputBlur = (identifier) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email"> Email </label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            value={enteredValues.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />

          <div className="control-error">
            {invalidEmail && <p> Please enter a valid Email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password"> Password </label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            value={enteredValues.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat"> Reset </button>
        <button className="button"> Login </button>
      </p>
    </form>
  );
}

/* Handling Value with "Multiple-state"
export default function Login() {
*  const [enteredEmail, setEnteredEmail] = useState('');
*  const [enteredPassword, setEnteredPassword] = useState('');

 ....

*  const handleEmailChange = (e) => {
*    setEnteredEmail(e.target.value);
  };

*  const handlePasswordChange = (e) => {
*    setEnteredPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email"> Email </label>
          <input
            id="email"
            type="email"
            name="email"
*            value={enteredEmail}
*            onChange={handleEmailChange}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password"> Password </label>
          <input
            id="password"
            type="password"
            name="password"
*            value={enteredPassword}
*            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <p className="form-actions">
        .....
      </p>
    </form>
  );
}
*/
