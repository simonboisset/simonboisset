import { marked } from 'marked';
import { Metadata } from 'next';
import { Locale } from '../../dictionaries';
import { getPost, postMetadata } from './posts/post';

type Params = { slug: string; lang: Locale };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await postMetadata(params.slug, params.lang);

  return {
    title: `Simon Boisset | ${post.title}`,
    description: post.preview,
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default async function BlogPostPage({ params: { slug, lang } }: { params: Params }) {
  const md = await getPost(slug, lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
