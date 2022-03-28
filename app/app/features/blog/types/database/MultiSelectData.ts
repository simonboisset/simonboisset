import { SelectPropertyResponse } from './SelectData';

export type MultiSelectData = {
  type: 'multi_select';
  multi_select: Array<SelectPropertyResponse>;
  id: string;
};
