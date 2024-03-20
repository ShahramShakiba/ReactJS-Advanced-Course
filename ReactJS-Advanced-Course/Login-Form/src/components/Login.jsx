export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email"> Email </label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password"> Password </label>
          <input id="password" type="password" name="password" />
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
