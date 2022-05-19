import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { getUserById } from '~/models/user.server';

const { SESSION_SECRET, NODE_ENV } = process.env;

const USER_SESSION_KEY = 'userId';

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set in `.env` file');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: [SESSION_SECRET],
    secure: NODE_ENV === 'production',
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function getLoggedUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request): Promise<null | string> {
  const userId = await getLoggedUserId(request);
  if (!userId) {
    return null;
  }

  const user = await getUserById(userId);
  if (user) {
    return user.id;
  }

  throw await logout(request);
}

export async function requireUserId(request: Request): Promise<string> {
  const userId = await getUser(request);

  if (userId) {
    return userId;
  }

  throw redirect('/login');
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  const cookie = await sessionStorage.commitSession(session, {
    maxAge: remember
      ? 60 * 60 * 24 * 7 // 7 days
      : undefined,
  });

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
