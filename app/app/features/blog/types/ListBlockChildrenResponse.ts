import { BlockObjectResponse } from './BlockObjectResponse';

export type ListBlockChildrenResponse = {
  type: 'block';
  block: {};
  object: 'list';
  next_cursor: string | null;
  has_more: boolean;
  results: Array<BlockObjectResponse>;
};
