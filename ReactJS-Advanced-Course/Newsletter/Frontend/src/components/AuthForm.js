import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

export default function AuthForm() {
  const navigation = useNavigation();
  const data = useActionData();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="POST" className="auth-form">
        <h1> {isLogin ? 'Log in' : 'Create a New User'} </h1>

        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
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
