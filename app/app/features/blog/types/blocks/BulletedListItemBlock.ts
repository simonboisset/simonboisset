import { ApiColor } from '../ApiColor';
import { RichTextItemResponse } from '../RichTextItemResponse';

export type BulletedListItemBlock = {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: Array<RichTextItemResponse>;
    color: ApiColor;
  };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
