import { DateResponse } from './DateResponse';
import { UserObjectResponse } from './UserObjectResponse';

export type RichTextItemResponse =
  | {
      type: 'text';
      text: { content: string; link: { url: string } | null };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
      plain_text: string;
      href: string | null;
    }
  | {
      type: 'mention';
      mention:
        | { type: 'user'; user: UserObjectResponse }
        | { type: 'date'; date: DateResponse }
        | { type: 'link_preview'; link_preview: { url: string } }
        | {
            type: 'template_mention';
            template_mention:
              | {
                  type: 'template_mention_date';
                  template_mention_date: 'today' | 'now';
                }
              | { type: 'template_mention_user'; template_mention_user: 'me' };
          }
        | { type: 'page'; page: { id: string } }
        | { type: 'database'; database: { id: string } };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
      plain_text: string;
      href: string | null;
    }
  | {
      type: 'equation';
      equation: { expression: string };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color:
          | 'default'
          | 'gray'
          | 'brown'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'pink'
          | 'red'
          | 'gray_background'
          | 'brown_background'
          | 'orange_background'
          | 'yellow_background'
          | 'green_background'
          | 'blue_background'
          | 'purple_background'
          | 'pink_background'
          | 'red_background';
      };
      plain_text: string;
      href: string | null;
    };
