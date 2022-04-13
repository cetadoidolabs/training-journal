import RegisterForm from '~/components/RegisterForm';

import type {
  ActionFunction,
  MetaFunction
} from '@remix-run/node';

import { createUser } from '~/models/user.server';
import { createUserSession } from '~/session.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const username = formData.get('username');
  const password = formData.get('password');

  const user = await createUser({ name, username, password });

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: '/'
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Register',
  };
};

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;