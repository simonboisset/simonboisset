import { Client } from '@notionhq/client';
import { LoaderFunction, redirect } from 'remix';
import { t } from '~/features/traduction';

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
  const lang = params.lang as keyof typeof t;
  const notion = new Client({
    auth: 'secret_OQIuYXSUFdR5pilVUjtbXdaXcsNCzh8KlmZxl9xtPZ0',
  });
  const pageId = t[lang || 'fr'].blogId;
  const notionResponse = (await notion.blocks.children.list({
    block_id: pageId,
  })) as any;
  const pages: Block[] = notionResponse.results
    .filter((page: Block) => page.type === 'child_page')
    .sort((a: Block, b: Block) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime());

  return redirect(`/fr/blog/${pages[0].id}`);
};
