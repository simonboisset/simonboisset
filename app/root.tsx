import type { HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { isValid, oneOf } from '@ts-v/kit';
import { useEffect, useState } from 'react';
import styles from '~/styles/root.css';
import tailwind from '~/styles/tailwind.css';
import { Footer, Header } from './core/layout';
import { languages, traduction } from './core/traduction';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=36000, s-maxage=36000',
  };
};

export const meta: MetaFunction = ({ params }) => {
  const lang = isValid(params.lang, oneOf(languages)) ? params.lang : 'en';
  const t = traduction[lang];
  return {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
    title: `Simon Boisset | ${t.fullStack}`,
    description: `${t.fullStack}, ${t.freelance} | Typescript, React, React Native`,
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

export type RootContext = { isFirstRender: boolean };

export default function App() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return (
    <html lang='fr'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-gradient-to-tr from-primary-500 via-primary-800 to-primary-900 min-h-screen'>
        <div id='main-body' className='flex flex-col font-sans min-h-screen'>
          <Header />
          <Outlet context={{ isFirstRender }} />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
