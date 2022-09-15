import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Footer, Header } from '~/core/layout';
import { useTraduction } from '~/core/traduction/useTraduction';

type Post = {
  id: string;
  title: string;
  description: string;
  url: string;
};
export const loader: LoaderFunction = async ({ context }) => {
console.log(context.ASSETS);

  const devResponse: any = await (
    await fetch('https://dev.to/api/articles?username=simonboisset')
  ).json();

  const posts: Post[] = devResponse.map((article: any) => ({
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url,
  }));

  return json(posts, {
    headers: {
      'Cache-Control': 'public, max-age=36000, s-maxage=36000',
    },
  });
};

export default function Blog() {
  const { t } = useTraduction();
  const posts = useLoaderData<Post[]>();

  return (
    <div id='main-body' className='flex flex-col font-sans min-h-screen'>
      <Header />
      <main className='flex flex-1 flex-col w-full items-center space-y-4 sm:p-8 p-4'>
        <h1 className='text-4xl font-bold'>{t.blog.myPosts}</h1>
        <h2 className='text-lg pb-12'>
          {t.blog.followMe}{' '}
          <a className='text-blue-500' href='https://dev.to/simonboisset'>
            Dev.to
          </a>
        </h2>
        {posts.map(({ id, description, title, url }) => (
          <a
            key={id}
            href={url}
            className='w-full max-w-lg border border-blue-500 py-4 px-8 rounded-lg hover:shadow-md hover:bg-slate-100 transition-all'>
            <h3 className='text-lg font-semibold text-blue-500'>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </main>
      <Footer />
    </div>
  );
}
