import { UserObjectResponse } from '../UserObjectResponse';

export type LastEdittedByData = {
  type: 'last_edited_by';
  last_edited_by: UserObjectResponse;
  id: string;
};
