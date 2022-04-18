import { UserObjectResponse } from '../UserObjectResponse';

export type PeopleData = {
  type: 'people';
  people: Array<UserObjectResponse>;
  id: string;
};
