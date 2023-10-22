import { marked } from 'marked';
import { Locale } from '../../dictionaries';
import { getDoc } from './doc';

export default async function Privacy({ params: { lang } }: { params: { lang: Locale } }) {
  const md = await getDoc(lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
