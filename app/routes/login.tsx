import type {
  ActionFunction,
  MetaFunction
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';

import LoginForm from '~/components/LoginForm';
import { verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/session.server';

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const username = formData.get('username');
  const password = formData.get('password');

  const user = await verifyLogin(username, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: 'Invalid email or password' } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: '/',
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  };
};

const Login = () => {
  const actionData = useActionData() as ActionData;

  return (
    <div>
      <h1>Login</h1>
      {actionData?.errors?.email && (
        <div>
          <strong>{actionData.errors.email}</strong>
        </div>
      )}
      <LoginForm />
    </div>
  );
};

export default Login;
