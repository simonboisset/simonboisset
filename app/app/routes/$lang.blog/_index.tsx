import type { Language } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { isValid } from '@ts-v/core';
import { oneOf } from '@ts-v/kit';
import db from '~/core/db.server';
import { Footer, Header } from '~/core/layout';
import { BlogList } from './BlogList';

export const loader: LoaderFunction = async ({ params }) => {
  const { lang, name } = params;
  if (!isValid(lang, oneOf(['fr', 'en'] as Language[]))) {
    return redirect('/');
  }
  const pages = await db.post.findMany({
    where: { language: lang, publish: true },
    select: { name: true, id: true, title: true },
    orderBy: { date: 'desc' },
  });
  if (!name && pages[0]?.name) {
    return redirect(`/${lang}/blog/${pages[0].name}`);
  }

  return pages;
};

export default function Blog() {
  const pages = useLoaderData<
    {
      name: string;
      id: string;
      title: string;
    }[]
  >();

  return (
    <div id='main-body' className='flex flex-col font-sans min-h-screen'>
      <Header />
      <main className='flex flex-1 flex-row items-stretch w-full self-center'>
        <BlogList pages={pages} />
        <div className='flex-1 w-full px-4'>
          <Outlet />
        </div>
        <nav className='flex-1 sm:flex hidden w-full max-w-xs'></nav>
      </main>
      <Footer />
    </div>
  );
}
