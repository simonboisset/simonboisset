import { marked } from 'marked';
import { Locale } from '../../dictionaries';
import { getPost } from './posts/post';

export default async function BlogPostPage({ params: { slug, lang } }: { params: { slug: string; lang: Locale } }) {
  const md = await getPost(slug, lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
