import { ApiColor } from '../ApiColor';
import { RichTextItemResponse } from '../RichTextItemResponse';

export type ToggleBlock = {
  type: 'toggle';
  toggle: { rich_text: Array<RichTextItemResponse>; color: ApiColor };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
