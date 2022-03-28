import { RichTextItemResponse } from '../RichTextItemResponse';

export type TableRowBlock = {
  type: 'table_row';
  table_row: { cells: Array<Array<RichTextItemResponse>> };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
