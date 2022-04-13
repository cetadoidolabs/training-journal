import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { getUser } from '~/session.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Training Journal',
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  userId: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUser(request);

  return json<LoaderData>({
    userId,
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
