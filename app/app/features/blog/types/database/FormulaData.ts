import { DateResponse } from '../DateResponse';

export type FormulaData = {
  type: 'formula';
  formula:
    | { type: 'string'; string: string | null }
    | { type: 'date'; date: DateResponse | null }
    | { type: 'number'; number: number | null }
    | { type: 'boolean'; boolean: boolean | null };
  id: string;
};
