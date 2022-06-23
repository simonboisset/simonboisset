import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from '~/styles/root.css';
import tailwind from '~/styles/tailwind.css';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=36000, s-maxage=36000',
  };
};

export const meta: MetaFunction = () => {
  return { title: 'Simon Boisset', description: 'Full stack developer' };
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'stylesheet',
      href: tailwind,
    },
  ];
}

export default function App() {
  return (
    <html lang='fr'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
