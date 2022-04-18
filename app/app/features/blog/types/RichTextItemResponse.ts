import { ApiColor } from './ApiColor';
import { DateResponse } from './DateResponse';
import { UserObjectResponse } from './UserObjectResponse';

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: ApiColor;
};

export type Text = {
  type: 'text';
  text: { content: string; link: { url: string } | null };
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};
export type Mention = {
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
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

export type Equation = {
  type: 'equation';
  equation: { expression: string };
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

export type RichTextItemResponse = Text | Mention | Equation;
