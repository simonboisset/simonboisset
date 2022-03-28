export type FilesData = {
  type: 'files';
  files: Array<
    | {
        file: { url: string; expiry_time: string };
        name: string;
        type?: 'file';
      }
    | {
        external: { url: string };
        name: string;
        type?: 'external';
      }
  >;
  id: string;
};
