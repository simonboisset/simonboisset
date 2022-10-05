import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { Footer, Text, View } from '~/core/layout';
import type { RootContext } from '~/root';
import { useTraduction } from '~/routes/$lang/traduction/useTraduction';

type Post = {
  id: string;
  title: string;
  description: string;
  url: string;
};
export const loader: LoaderFunction = async () => {
  const devResponse: any = await (await fetch('https://dev.to/api/articles?username=simonboisset')).json();

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
  const { isFirstRender } = useOutletContext<RootContext>();
  return (
    <View isFirstRender={isFirstRender}>
      <main className='flex flex-1 flex-col w-full items-center space-y-4 sm:p-8 p-4'>
        <Text As='h3' color='gradient' font='black'>
          {t.blog.myPosts}
        </Text>
        <Text As='h6' font='light' color='white' className='pb-12'>
          <Text As='span'>{t.blog.followMe} </Text>
          <a className='text-blue-500' href='https://dev.to/simonboisset'>
            Dev.to
          </a>
        </Text>
        <div className='flex justify-center flex-wrap'>
          {posts.map(({ id, description, title, url }) => (
            <a
              key={id}
              href={url}
              className='w-full max-w-sm py-4 px-8 bg-primary-700 h-48 rounded-2xl sm:mr-6 mb-6 hover:-translate-y-2 hover:scale-105 transition-all ease-in-out hover:bg-primary-600'>
              <Text As='h5' color='gradient' font='extrabold' className='pb-2 hover:bg-pr'>
                {title}
              </Text>
              <Text className='text-sm italic' color='white'>
                {description}
              </Text>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </View>
  );
}
