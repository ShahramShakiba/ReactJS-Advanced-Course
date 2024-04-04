import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

export default function AuthForm() {
  //get action data
  const data = useActionData();
  //submitting data
  const navigation = useNavigation();

  // set query parameters
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className="auth-form">
        <h1> {isLogin ? 'Log in' : 'Create A New User'} </h1>

        {data && data.errors && (
          <ul>
            {/* Object.values(): since errors are Objs */}
            {Object.values(data.errors).map((err) => (
              <li key={err}> {err} </li>
            ))}
          </ul>
        )}

        {data && data.message && <p> {data.message} </p>}

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
            {isLogin ? 'Create New User' : 'Login'}
          </Link>

          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
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
