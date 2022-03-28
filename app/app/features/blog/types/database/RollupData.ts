import { DateResponse } from '../DateResponse';
import { RichTextItemResponse } from '../RichTextItemResponse';
import { UserObjectResponse } from '../UserObjectResponse';

export type RollupData = {
  type: 'rollup';
  rollup:
    | {
        type: 'number';
        number: number | null;
        function: RollupFunction;
      }
    | {
        type: 'date';
        date: DateResponse | null;
        function: RollupFunction;
      }
    | {
        type: 'array';
        array: Array<
          | { type: 'title'; title: Array<RichTextItemResponse> }
          | {
              type: 'rich_text';
              rich_text: Array<RichTextItemResponse>;
            }
          | {
              type: 'people';
              people: Array<UserObjectResponse>;
            }
          | { type: 'relation'; relation: Array<{ id: string }> }
        >;
        function: RollupFunction;
      };
  id: string;
};

type RollupFunction =
  | 'count'
  | 'count_values'
  | 'empty'
  | 'not_empty'
  | 'unique'
  | 'show_unique'
  | 'percent_empty'
  | 'percent_not_empty'
  | 'sum'
  | 'average'
  | 'median'
  | 'min'
  | 'max'
  | 'range'
  | 'earliest_date'
  | 'latest_date'
  | 'date_range'
  | 'checked'
  | 'unchecked'
  | 'percent_checked'
  | 'percent_unchecked'
  | 'show_original';
