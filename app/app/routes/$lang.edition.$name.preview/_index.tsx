import type { Post } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/react/routeModules';
import db from '~/core/db.server';
import { Link } from '~/core/layout';
import { saveEditorAction } from '~/core/lexical/action.servers';
import PreviewEditor from '~/core/lexical/Preview';
import markdown from '~/styles/markdown.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: markdown,
    },
    {
      rel: 'stylesheet',
      href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/a11y-dark.min.css',
    },
  ];
}
export const loader: LoaderFunction = async ({ params }) => {
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

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
    title: `${data.title}`,
    description: data.description,
  };
};
export const action = saveEditorAction;
export default function EditPage() {
  const activePage = useLoaderData<Post>();

  return (
    <div>
      <Link to={`/fr/edition/${activePage.name}`}>Retour</Link>
      <PreviewEditor content={activePage.content} />
    </div>
  );
}
