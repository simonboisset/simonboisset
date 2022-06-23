import type { Language } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import db from '~/core/db.server';
import { Footer, Header } from '~/core/layout';
import { sessionStorage, USER_SESSION_KEY } from '~/core/sessionStorage';
import { BlogList } from './BlogList';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);

  const username = session.get(USER_SESSION_KEY);

  if (username !== 'sbDev') {
    return redirect('/');
  }

  const pages = await db.post.findMany({
    select: { name: true, id: true, title: true, language: true, publish: true },
    orderBy: { slug: 'asc' },
  });
  if (params.name) {
    redirect(`/fr/edition/${pages[0].name}`);
  }
  return pages;
};

export default function Edition() {
  const pages = useLoaderData<
    {
      name: string;
      id: string;
      title: string;
      language: Language;
      publish: boolean;
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
      </main>
      <Footer />
    </div>
  );
}
