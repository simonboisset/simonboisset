import type { Language } from '@prisma/client';
import type { Schema } from '@ts-v/core';
import { object } from '@ts-v/core';
import { oneOf, string } from '@ts-v/kit';

const isAny: Schema<any> = (data) => {
  return { data, errors: undefined };
};

export const saveEditorSchema = object({
  slug: string(),
  name: string(),
  language: oneOf(['fr', 'en'] as Language[]),
  title: string(),
  description: string(),
  editor: isAny,
});
