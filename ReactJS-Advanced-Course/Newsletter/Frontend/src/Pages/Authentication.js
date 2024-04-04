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
        message: `Invalid authentication mode "${mode}"`,
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

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      {
        message: 'Could Not Authenticate User',
      },
      { status: 500 }
    );
  }

  // soon: manage token

  return redirect('/');
}
