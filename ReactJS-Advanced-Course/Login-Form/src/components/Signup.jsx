export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // get all data from: How did you find us
    const acquisitionChannel = formData.getAll('acquisition');
    const data = Object.fromEntries(formData.entries());
    data.acquisition = acquisitionChannel;
    console.log(data);

    // resetting Inputs
    // e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Welcome on board! </h2>
      <p> We just need a little bit of data from you to get you started 📋 </p>

      <div className="control">
        <label htmlFor="email"> Email </label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password"> Password </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={8}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password"> Confirm Password </label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
        </div>
      </div>

      <hr className="lineBrake" />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name"> First Name </label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name"> Last Name </label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone"> What best describes your role? </label>

        <select id="role" name="role" required>
          <option value="student"> Student </option>
          <option value="teacher"> Teacher </option>
          <option value="employee"> Employee </option>
          <option value="founder"> Founder </option>
          <option value="other"> Other </option>
        </select>
      </div>

      <fieldset>
        <legend> &nbsp; How did you find us? &nbsp; </legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google"> Google </label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend"> Referred by friend </label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other"> Other </label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

/* FormData()
- is an Object to get hold of the different values entered into a form

- as a result you'll get back a form-data obj:
?  const formData = new FormData(e.target);
    = that will give you access to data that was added to all 
      the inputs in that form

* now for this to work :
  - all those Inputs must have that "name-attribute"
  - even Select-field must have that "name-attribute"
*/

/* Object.fromEntries(formData.entries());
- it will give us an array of the input fields & their values

? we can access formData like this:
const enteredEmail = formData.get('email');
const enteredPassword = formData.get('password');
- BUT we could end up with a lot of code

OR WE CAN DO IT LIKE THIS:
const { email, password } = Object.fromEntries(formData.entries())

*/
