import { marked } from 'marked';
import { Metadata, ResolvingMetadata } from 'next';
import { Locale, getDictionary } from '../../dictionaries';
import { getDoc } from './doc';

type Params = { lang: Locale };

export async function generateMetadata({ params }: { params: Params }, parent: ResolvingMetadata): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    title: `Simon Boisset | ${t.footer.legal}`,
    description: t.home.description,
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default async function Legal({ params: { lang } }: { params: Params }) {
  const md = await getDoc(lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
