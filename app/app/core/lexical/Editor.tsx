import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import type { Language } from '@prisma/client';
import { Form } from '@remix-run/react';
import { useTsvAction } from '@ts-v/remix';
import type { EditorState, LexicalEditor } from 'lexical';
import { useState } from 'react';
import { Button, TextField } from '../layout';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { saveEditorSchema } from './schema';
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

export default function Editor({
  content,
  description,
  title,
  lang,
  name,
  slug,
}: {
  title: string;
  description: string;
  content: string;
  slug: string;
  lang: Language;
  name: string;
}) {
  const { onSubmit, errors } = useTsvAction(saveEditorSchema);
  const [editorTosave, setEditor] = useState<string>('');

  const onChange = (_: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setEditor(markdown);
    });
  };

  return (
    <Form onSubmit={onSubmit} method='post' className='flex flex-1 flex-col space-y-4 p-8'>
      <div className='flex flex-row space-x-2'>
        <TextField className='flex-1' label='Langue' defaultValue={lang} name='language' error={errors?.language} />
        <TextField className='flex-1' label='Slug' defaultValue={slug} name='slug' error={errors?.slug} />
        <TextField className='flex-1' label='Id' defaultValue={name} name='name' error={errors?.name} />
      </div>
      <TextField label='Titre' name='title' defaultValue={title} error={errors?.title} />
      <TextField label='Description' name='description' defaultValue={description} error={errors?.description} />

      <LexicalComposer initialConfig={editorConfig}>
        <div className='bg-white text-slate-600 rounded-xl overflow-hidden border'>
          <ToolbarPlugin />
          <div className='relative '>
            <RichTextPlugin
              initialEditorState={() => {
                $convertFromMarkdownString(content || '', TRANSFORMERS);
              }}
              contentEditable={<ContentEditable className='outline-none caret-slate-400 p-8' />}
              placeholder={<div className='absolute top-8 left-8 text-slate-400'>Enter some rich text...</div>}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <OnChangePlugin onChange={onChange} />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
      <input type='hidden' name='editor' value={editorTosave} />
      <Button type='submit'>Save</Button>
    </Form>
  );
}
