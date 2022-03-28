import {
  CheckboxData,
  CreatedByData,
  CreatedTimeData,
  DateData,
  EmailData,
  FilesData,
  FormulaData,
  LastEditedTimeData,
  LastEdittedByData,
  MultiSelectData,
  NumberData,
  PeopleData,
  PhoneNumberData,
  RelationData,
  RichTextData,
  RollupData,
  SelectData,
  SelectPropertyResponse,
  TitleData,
  UrlData,
} from './database';
import { EmojiRequest } from './EmojiRequest';
export type DataProperties = Record<
  string,
  | CheckboxData
  | CreatedByData
  | CreatedTimeData
  | DateData
  | EmailData
  | FilesData
  | FormulaData
  | LastEditedTimeData
  | LastEdittedByData
  | MultiSelectData
  | NumberData
  | PeopleData
  | PhoneNumberData
  | RelationData
  | RichTextData
  | RollupData
  | SelectData
  | SelectPropertyResponse
  | TitleData
  | UrlData
>;
export type DatabaseResult<T extends DataProperties> = {
  parent:
    | { type: 'database_id'; database_id: string }
    | { type: 'page_id'; page_id: string }
    | { type: 'workspace'; workspace: true };
  properties: T;
  icon:
    | { type: 'emoji'; emoji: EmojiRequest }
    | null
    | { type: 'external'; external: { url: string } }
    | null
    | { type: 'file'; file: { url: string; expiry_time: string } }
    | null;
  cover:
    | { type: 'external'; external: { url: string } }
    | null
    | { type: 'file'; file: { url: string; expiry_time: string } }
    | null;
  created_by: { id: string; object: 'user' };
  last_edited_by: { id: string; object: 'user' };
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  url: string;
};

export type QueryDatabaseResponse<T extends DataProperties> = {
  type: 'page';
  page: {};
  object: 'list';
  next_cursor: string | null;
  has_more: boolean;
  results: DatabaseResult<T>[];
};
