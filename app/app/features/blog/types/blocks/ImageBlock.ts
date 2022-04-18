import { RichTextItemResponse } from '../RichTextItemResponse';

export type ImageBlock = {
  type: 'image';
  image:
    | {
        type: 'external';
        external: { url: string };
        caption: Array<RichTextItemResponse>;
      }
    | {
        type: 'file';
        file: { url: string; expiry_time: string };
        caption: Array<RichTextItemResponse>;
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
