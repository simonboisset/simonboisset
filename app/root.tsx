import type { HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from '~/styles/root.css';
import tailwind from '~/styles/tailwind.css';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=36000, s-maxage=36000',
  };
};

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
    title: 'Simon Boisset | Full stack developer',
    description: 'Full stack developer, React Typescript Node',
  };
};

export function links() {
  return [
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
export const loader: LoaderFunction = async ({ request }) => {
  const lang = request.headers.get('Accept-Language')?.split(',')[0].split('-')[0];
  return lang || 'en';
};
export default function App() {
  return (
    <html lang='fr'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-gradient-to-tr from-primary-500 via-primary-800 to-primary-900'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
