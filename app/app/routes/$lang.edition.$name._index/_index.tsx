import type { Post } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import db from '~/core/db.server';
import { Button, Link } from '~/core/layout';
import { saveEditorAction } from '~/core/lexical/action.servers';
import Editor from '~/core/lexical/Editor';
import lexical from '~/core/lexical/lexical.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: lexical,
    },
  ];
}
export const loader: LoaderFunction = async ({ params, request }) => {
  const { name } = params;
  if (!name) {
    return redirect('/');
  }

  const activePage = await db.post.findUnique({
    where: { name },
  });
  if (!activePage) {
    return redirect('/');
  }
  return activePage;
};
export const action = saveEditorAction;
export default function EditPage() {
  const activePage = useLoaderData<Post>();
  return (
    <div className='flex flex-row w-full '>
      <Editor content={activePage.content} description={activePage.description} title={activePage.title} />
      <div className='flex flex-col space-y-2 py-2 w-40'>
        <Link to='preview'>Preview</Link>
        {activePage.publish ? (
          <Form method='patch'>
            <Button className='w-full' type='submit'>
              Unpublish
            </Button>
          </Form>
        ) : (
          <Form method='put'>
            <Button className='w-full' type='submit'>
              Publish
            </Button>
          </Form>
        )}
        <Form method='delete'>
          <Button className='w-full' type='submit'>
            Delete
          </Button>
        </Form>
      </div>
    </div>
  );
}
