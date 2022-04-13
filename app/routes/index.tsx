import { Link, Form } from '@remix-run/react';

import { useOptionalUser } from '~/utils/user';

export default function Index() {
  const user = useOptionalUser();
  const loggedUserId = user?.userId;

  return (
    <div>
      <h1>Hello World!</h1>

      {loggedUserId ?
        (<Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>) :
        (<Link to="/login">Login</Link>)}

      <br />
      or
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}
