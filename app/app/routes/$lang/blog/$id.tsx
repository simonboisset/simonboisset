import { Client } from '@notionhq/client';
import { LoaderFunction, redirect, useLoaderData } from 'remix';
import Page from '~/features/blog/Page';
import { BlockObjectResponse } from '~/features/blog/types';
import { ListBlockChildrenResponse } from '~/features/blog/types/ListBlockChildrenResponse';

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new Client({
    auth: 'secret_OQIuYXSUFdR5pilVUjtbXdaXcsNCzh8KlmZxl9xtPZ0',
  });
  const pageId = params.id;
  if (!pageId) {
    return redirect('/fr/blog');
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
