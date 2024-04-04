import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  //signup or login request should be sent
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json(
      {
        message: `Invalid Authentication Mode "${mode}"`,
      },
      { status: 422 }
    );
  }

  //request: get form-data that submitted
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify(authData),
  });

  // VALIDATION ERRORS
  if (response.status === 422 || response.status === 401) {
    return response; //show error message
  }

  if (!response.ok) {
    throw json(
      {
        message: 'Could Not Authenticate User',
      },
      { status: 500 }
    );
  }

  // extract the token we get it back from backend
  const resData = await response.json();
  const token = resData.token;

  // store the token
  localStorage.setItem('token', token);

  return redirect('/');
}
