export type LinkToPageBlock = {
  type: 'link_to_page';
  link_to_page: { type: 'page_id'; page_id: string } | { type: 'database_id'; database_id: string };
  object: 'block';
  id: string;
  created_time: string;
  created_by: { id: string; object: 'user' };
  last_edited_time: string;
  last_edited_by: { id: string; object: 'user' };
  has_children: boolean;
  archived: boolean;
};
