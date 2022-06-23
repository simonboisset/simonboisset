import { object, Schema } from '@ts-v/core';
import { string } from '@ts-v/kit';

const isAny: Schema<any> = (data) => {
  return { data, errors: undefined };
};

export const saveEditorSchema = object({
  title: string(),
  description: string(),
  editor: isAny,
});
