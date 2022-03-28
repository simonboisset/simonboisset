export type SelectData = {
  type: 'select';
  select: SelectPropertyResponse | null;
  id: string;
};

export type SelectPropertyResponse = {
  id: string;
  name: string;
  color: SelectColor;
};

type SelectColor = 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';
