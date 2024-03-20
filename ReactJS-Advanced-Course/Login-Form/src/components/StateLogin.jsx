import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput';

export default function Login() {
  // Email Input
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
  // Password Input
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      emailHasError ||
      passwordHasError ||
      emailValue === '' ||
      passwordValue === ''
    ) {
      alert('Please enter a valid Email or Password.');
      return;
    }
   
    console.log(emailValue, passwordValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && 'Please enter a valid Email.'}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid Password.'}
        />
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

/* Validation on every-keystroke: 
in this way is too early
  const invalidEmail =
    enteredValues.email !== '' && !enteredValues.email.includes('@'); 
*/

/* Handling State in the COMPONENT
export default function Login() {
*  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
*  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  /// Validating on losing focus
*  const invalidEmail =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    isNotEmpty(enteredValues.email);

*  const invalidPassword =
    didEdit.password && !hasMinLength(enteredValues.password, 8);

*  const handleSubmit = (e) => {
    e.preventDefault();

    /// Email validation
    const invalidEmail = !enteredValues.email.includes('@');

    /// Password validation
    const invalidPassword = enteredValues.password.trim().length < 8;

    if (invalidEmail || invalidPassword) {
      /// Show error message and prevent form submission
      setDidEdit({
        email: true,
        password: true,
      });
    } else {
      /// Valid form submission
      console.log(enteredValues);

      /// Resetting inputs
      setEnteredValues({
        email: '',
        password: '',
      });
      setDidEdit({
        email: false,
        password: false,
      });
    }
  };

*  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    /// disappear the error message when user starts typing again
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  };

  /// Validating on losing focus
*  const handleInputBlur = (identifier) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      .....

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
*         onBlur={() => handleInputBlur('email')}
*         value={enteredValues.email}
*         onChange={(e) => handleInputChange('email', e.target.value)}
          error={invalidEmail && 'Please enter a valid Email.'}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
*         onBlur={() => handleInputBlur('password')}
*         value={enteredValues.password}
*         onChange={(e) => handleInputChange('password', e.target.value)}
          error={invalidPassword && 'Please enter a valid Password.'}
        />
      </div>

      <p className="form-actions">
        ......
      </p>
    </form>
  );
}
*/
