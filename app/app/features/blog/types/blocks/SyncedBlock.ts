export type SyncedBlock = {
  type: 'synced_block';
  synced_block: {
    synced_from: { type: 'block_id'; block_id: string } | null;
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
