import { Client } from '@notionhq/client';
import { LoaderFunction, redirect, useLoaderData } from 'remix';
import Page from '~/features/blog/Page';
import { BlockObjectResponse } from '~/features/blog/types';
import { ListBlockChildrenResponse } from '~/features/blog/types/ListBlockChildrenResponse';
import { t } from '~/features/traduction';

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const lang = (params.lang as keyof typeof t) || 'en';
  const pageId = params.id;
  if (!pageId) {
    return redirect(`/${lang}/blog`);
  }
  const notionResponse = (await notion.blocks.children.list({
    block_id: pageId,
  })) as ListBlockChildrenResponse;

  const retrieve = (await notion.blocks.retrieve({
    block_id: pageId,
  })) as any;
  return {
    title: retrieve.child_page.title,
    createdAt: retrieve.created_time,
    blocks: notionResponse.results,
  };
};

export default function Blog() {
  const data = useLoaderData<{ title: string; createdAt: string; blocks: BlockObjectResponse[] }>();

  return <Page {...data} />;
}
