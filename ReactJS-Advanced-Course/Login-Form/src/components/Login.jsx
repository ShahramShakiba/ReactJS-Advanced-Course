import { useRef } from 'react';

export default function Login() {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email"> Email </label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password"> Password </label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat"> Reset </button>
        <button className="button"> Login </button>
      </p>
    </form>
  );
}

/* Button inside of a Form element
- the default browser behavior for BTNs in form is that those BTNs submit the form 
- and technically that means that an HTTP Request is created 
- and is send to the server that's serving the website

? - Buttons in form will generate requests and send those req to the server which this default behavior is a "PROBLEM" 

! How we can prevent the default behavior :
*  01. add type  →  type="button"  → will not submit the form because
       the default type is the "submit" type
    
    <button type="button" className="button" onClick={handleSubmit}>
          Login
    </button>


*  02. the elegant way → remove type from the btn
                        → remove onClick Listener
        <button className="button">
          Login
        </button>
                        → add onSubmit event handler prop on the "form"
        <form onSubmit={handleSubmit}>
          ....
        </form>
        
        - which trigger a submit event which you can listen and react whenever it's submitted by one of its BTNs being pressed

        - then we trigger "handleSubmit" fn here
        - now automatically we get an event object
        - and we pass that event-obj to the fn
           const handleSubmit = (e) => {
              e.preventDefault();
            };
*/

/* refs
- current: holds the actual connected value(input-object-value)

* benefits:
  - requires less code then we using state
  - we don't need to add any change-handler fn
  - or we don't need add the onChange or values-props

* disadvantage:
  - resetting those values in a clean way is a bit harder:
      because you discouraged to use refs for "manipulating the DOM"

      . email.current.value = '';
      resetting them like this would work but not recommended

  - you may end up with a lot of refs if you have more complex form
    you'll have to set up and connect all those refs manually step by step
*/
