import {
  AudioBlock,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  ChildDatabaseBlock,
  ChildPageBlock,
  CodeBlock,
  ColumnBlock,
  ColumnListBlock,
  DividerBlock,
  EmbedBlock,
  EquationBlock,
  FileBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  LinkPreviewBlock,
  LinkToPageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  PdfBlock,
  QuoteBlock,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  TableRowBlock,
  TemplateBlock,
  ToDoBlock,
  ToggleBlock,
  UnsupportedBlock,
  VideoBlock,
} from './blocks';

export type BlockObjectResponse =
  | AudioBlock
  | BookmarkBlock
  | BreadcrumbBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ChildDatabaseBlock
  | ChildPageBlock
  | CodeBlock
  | ColumnBlock
  | ColumnListBlock
  | DividerBlock
  | EmbedBlock
  | EquationBlock
  | FileBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | LinkPreviewBlock
  | LinkToPageBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | PdfBlock
  | QuoteBlock
  | SyncedBlock
  | TableBlock
  | TableOfContentsBlock
  | TableRowBlock
  | TemplateBlock
  | ToDoBlock
  | ToggleBlock
  | UnsupportedBlock
  | VideoBlock;
