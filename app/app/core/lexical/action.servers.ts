import type { ActionFunction } from '@remix-run/node';
import { isValid } from '@ts-v/core';
import { string } from '@ts-v/kit';
import { validateRequest } from '@ts-v/remix/dist/node';
import db from '../db.server';
import { requireSession } from '../sessionStorage';
import { saveEditorSchema } from './schema';

export const saveEditorAction: ActionFunction = async ({ request, params }) => {
  try {
    await requireSession(request);
    const { name } = params;

    if (!isValid(name, string())) {
      return null;
    }
    if (request.method === 'PUT') {
      await db.post.update({
        where: { name },
        data: { publish: true },
      });
      return null;
    }
    if (request.method === 'PATCH') {
      await db.post.update({
        where: { name },
        data: { publish: false },
      });
      return null;
    }
    if (request.method === 'DELETE') {
      await db.post.delete({
        where: { name },
      });
      return null;
    }
    if (name === 'new') {
      const {
        description,
        editor,
        title,
        language,
        name: nextName,
        slug,
      } = await validateRequest(request, saveEditorSchema);
      await db.post.create({
        data: { description, title, content: editor, language, slug, name: nextName },
      });
      return null;
    }
    const {
      description,
      editor,
      title,
      language,
      name: nextName,
      slug,
    } = await validateRequest(request, saveEditorSchema);
    await db.post.update({
      where: { name },
      data: { description, title, content: editor, language, slug, name: nextName },
    });
    return null;
  } catch (error) {
    return error;
  }
};