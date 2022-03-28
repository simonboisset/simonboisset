import { UserObjectResponse } from '../UserObjectResponse';

export type CreatedByData = {
  type: 'created_by';
  created_by: UserObjectResponse;
  id: string;
};
