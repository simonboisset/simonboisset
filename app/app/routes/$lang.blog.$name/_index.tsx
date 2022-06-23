import type { Language, Post } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { isValid } from '@ts-v/core';
import { oneOf } from '@ts-v/kit';
import dayjs from 'dayjs';
import db from '~/core/db.server';
import lexical from '~/core/lexical/lexical.css';
import PreviewEditor from '~/core/lexical/Preview';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: lexical,
    },
  ];
}

export const loader: LoaderFunction = async ({ params }) => {
  const { lang, name } = params;
  if (!name || !isValid(lang, oneOf(['fr', 'en'] as Language[]))) {
    return redirect('/');
  }

  const activePage = await db.post.findUnique({
    where: { name },
  });
  if (!activePage) {
    return redirect('/');
  }
  if (activePage.language !== lang) {
    const translatedPage = await db.post.findUnique({
      where: { slug_language: { slug: activePage.slug, language: lang } },
      select: { name: true },
    });
    if (!translatedPage) {
      return redirect('/');
    }
    return redirect(`/${lang}/blog/${translatedPage.name}`);
  }
  return activePage;
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data.title, description: data.description };
};

export default function Blog() {
  const activePage = useLoaderData<Post>();

  return (
    <div className='flex flex-col space-y-4 py-8 text-slate-600'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-4xl'>{activePage.title}</h1>
        <div className='italic'>{dayjs(activePage.date).format('MM/YYYY')}</div>
      </div>
      <h2 className='text-xl'>{activePage.description}</h2>
      <div className='h-px bg-slate-400 w-full' />
      <PreviewEditor content={activePage.content} description={activePage.description} title={activePage.title} />
    </div>
  );
}
