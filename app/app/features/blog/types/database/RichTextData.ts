import { RichTextItemResponse } from '../RichTextItemResponse';

export type RichTextData = {
  type: 'rich_text';
  rich_text: Array<RichTextItemResponse>;
  id: string;
};
