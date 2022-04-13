import { Form } from '@remix-run/react';

const RegisterForm = () => {
  return (
    <Form method="post">
      <div>
        Name <br />
        <input type="text" name="name" required />
      </div>

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

export default RegisterForm;