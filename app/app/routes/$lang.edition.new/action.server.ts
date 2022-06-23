import type { Language } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { object } from '@ts-v/core';
import { oneOf, string } from '@ts-v/kit';
import { validateRequest } from '@ts-v/remix/dist/node';
import db from '~/core/db.server';

export const newBlogAction: ActionFunction = async ({ request }) => {
  const { language, slug, name } = await validateRequest(
    request,
    object({
      slug: string(),
      name: string(),
      language: oneOf(['fr', 'en'] as Language[]),
    }),
  );
  await db.post.create({ data: { slug, language, name, type: 'BLOG' } });
  return redirect(`/fr/edition/${name}`);
};
