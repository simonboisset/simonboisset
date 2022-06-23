import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ExampleTheme from './themes/ExampleTheme';

const editorConfig = {
  theme: ExampleTheme,
  onError(error: any) {
    throw error;
  },
  namespace: 'MyEditor',
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function PreviewEditor({
  content,
  description,
  title,
}: {
  title: string;
  description: string;
  content: any;
}) {
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, readOnly: true }}>
      <div className='bg-white text-slate-600 p-12 outline-none'>
        <RichTextPlugin
          initialEditorState={() => {
            $convertFromMarkdownString(content || '', TRANSFORMERS);
          }}
          contentEditable={<ContentEditable spellCheck={false} readOnly className='outline-none' />}
          placeholder=''
        />
      </div>
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <AutoLinkPlugin />
    </LexicalComposer>
  );
}
