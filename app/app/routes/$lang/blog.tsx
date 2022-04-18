import { Client } from '@notionhq/client';
import { Link, LoaderFunction, Outlet, redirect, useLoaderData } from 'remix';
import { Footer, Header } from '~/features';
import { t } from '~/features/traduction';
import { Body, Main } from '~/ui';

type BlockType = 'child_page' | 'paragraph';
type Block = {
  object: 'block';
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: { object: 'user'; id: string };
  last_edited_by: { object: 'user'; id: string };
  has_children: boolean;
  archived: boolean;
  type: BlockType;
  child_page: { title: string };
};

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const lang = (params.lang as keyof typeof t) || 'en';
  const pageId = t[lang].blogId;
  const notionResponse = (await notion.blocks.children.list({
    block_id: pageId,
  })) as any;
  const pages: Block[] = notionResponse.results;

  const loadedPage = pages
    .filter((page) => page.type === 'child_page')
    .map(({ child_page, id, created_time }) => ({ id, title: child_page.title, createdAt: new Date(created_time) }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const id = params.id;
  if (!id || !loadedPage.map(({ id }) => id).includes(id)) {
    return redirect(`/${lang}/blog/${pages[0].id}`);
  }
  return loadedPage;
};

export default function Blog() {
  const pages = useLoaderData<{ id: string; title: string; createdAt: Date }[]>();
  return (
    <Body>
      <Header />
      <Main className='flex flex-row items-stretch w-full self-center'>
        <nav className='flex-1 w-full max-w-xs hidden sm:flex flex-col space-y-2 py-4 px-12 '>
          {pages.map((page) => (
            <Link to={page.id} key={page.id} className='text-sm hover:text-blue-400'>
              {page.title}
            </Link>
          ))}
        </nav>
        <div className='flex-1 w-full px-4'>
          <Outlet />
        </div>
        <nav className='flex-1 sm:flex hidden w-full max-w-xs'></nav>
      </Main>
      <Footer />
    </Body>
  );
}
