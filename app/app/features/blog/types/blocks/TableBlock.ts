export type TableBlock = {
  type: 'table';
  table: {
    has_column_header: boolean;
    has_row_header: boolean;
    table_width: number;
  };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
