import { Form, Link, useSearchParams } from 'react-router-dom';

export default function AuthForm() {
  // set query parameters
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method="post" className="auth-form">
        <h1> {isLogin ? 'Log in' : 'Sign up'} </h1>

        <p>
          <label htmlFor="email"> Email </label>
          <input id="email" type="email" name="email" required />
        </p>

        <p>
          <label htmlFor="image"> Password </label>
          <input id="password" type="password" name="password" required />
        </p>

        <div className="actions">
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Signup' : 'Login'}
          </Link>

          <button> Save </button>
        </div>
      </Form>
    </>
  );
}

/* useSearchParams()

- const [searchParams, setSearchParams] = useSearchParams();

* In React, the useSearchParams hook is a powerful tool for handling URL query parameters. 

* This hook allows you to easily access and manipulate query parameters in the URL. By using useSearchParams, you can extract query parameters from the URL, update them, and reflect those changes in your component's state.
*/
