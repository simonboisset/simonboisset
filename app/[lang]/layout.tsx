import { cn } from '@/ui/utils';
import type { Metadata } from 'next';
import { Locale } from './dictionaries';
import './globals.css';
import { getTheme } from './theme';
import { Footer } from './ui/footer';
import { Header } from './ui/header';

export const metadata: Metadata = {
  title: 'Simon Boisset',
  description: 'Simon Boisset full stack developer',
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const theme = await getTheme();

  return (
    <html lang={params.lang}>
      <head>
        <meta charSet='utf-8' />
        <script defer data-domain='simonboisset.com' src='https://analytics.lezo.app/js/script.js'></script>
      </head>
      <body
        className={cn(
          theme === 'light' ? '' : 'dark',
          'min-h-screen flex flex-col transition-colors duration-500 ease-in-out',
          'text-primary bg-background',
        )}>
        <Header params={params} theme={theme} />
        <main className='flex-1 pt-16'>{children}</main>
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
