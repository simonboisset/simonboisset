import { ApiColor } from '../ApiColor';

export type TableOfContentsBlock = {
  type: 'table_of_contents';
  table_of_contents: { color: ApiColor };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
