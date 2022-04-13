import { Form } from '@remix-run/react';

const LoginForm = () => {
  return (
    <Form method="post">
      <div>
        Username <br />
        <input type="text" name="username" required />
      </div>

      <div>
        Password <br />
        <input type="password" name="password" required />
      </div>

      <button type="submit">
        Submit
      </button>
    </Form>
  );

};

export default LoginForm;