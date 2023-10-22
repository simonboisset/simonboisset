import Image from 'next/image';
import { Locale, getDictionary } from '../dictionaries';
import { getPostList } from './[slug]/posts/post';

export default async function BlogPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = await getDictionary(lang);
  const posts = await getPostList(lang);

  return (
    <div className='flex flex-col gap-24 w-full max-w-screen-md mx-auto mt-32 px-12'>
      <div className='flex flex-col gap-12 items-center'>
        <h1 className='text-4xl font-black text-center'>{t.blog.title}</h1>
      </div>
      <ul className='flex flex-col gap-12  w-full'>
        {posts.map(({ slug, title, preview, img }) => (
          <li key={slug}>
            <a
              href={`/${lang}/blog/${slug}`}
              className='bg-foreground/5 hover:bg-foreground/10 p-4 rounded-xl flex flex-col gap-2 shadow-md transition-colors'>
              {!!img && (
                <Image src={img} className='w-full rounded-xl' alt={title || 'Post image'} width={800} height={400} />
              )}
              <span className='text-2xl font-bold'>{title}</span>
              <span>{preview}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
