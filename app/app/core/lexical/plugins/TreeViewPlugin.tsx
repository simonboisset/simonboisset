import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName='block bg-black text-white p-2 text-sm whitespace-pre-wrap max-h-40 relative rounded-b-xl overflow-auto'
      timeTravelPanelClassName='flex m-1 overflow-hidden'
      timeTravelButtonClassName='absolute top-2 right-2'
      timeTravelPanelSliderClassName='flex-1'
      timeTravelPanelButtonClassName='absolute top-2 right-2'
      editor={editor}
    />
  );
}
