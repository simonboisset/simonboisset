import { ApiColor } from '../ApiColor';
import { EmojiRequest } from '../EmojiRequest';
import { RichTextItemResponse } from '../RichTextItemResponse';

export type CalloutBlock = {
  type: 'callout';
  callout: {
    rich_text: Array<RichTextItemResponse>;
    color: ApiColor;
    icon:
      | { type: 'emoji'; emoji: EmojiRequest }
      | null
      | { type: 'external'; external: { url: string } }
      | null
      | { type: 'file'; file: { url: string; expiry_time: string } }
      | null;
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
