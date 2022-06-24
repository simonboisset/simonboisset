import { $createCodeNode, $isCodeNode, getCodeLanguages, getDefaultCodeLanguage } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import { $isAtNodeEnd, $wrapLeafNodesInElements } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  GridSelection,
  NodeSelection,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '~/core/layout/utils';
import { ArrowClockwise } from '../icons/ArrowClockwise';
import { ArrowCounterclockwise } from '../icons/ArrowCounterclockwise';
import { ChevronDown } from '../icons/ChevronDown';
import { Code } from '../icons/Code';
import { Justify } from '../icons/Justify';
import { Link } from '../icons/Link';
import { TextCenter } from '../icons/TextCenter';
import { TextLeft } from '../icons/TextLeft';
import { TextRight } from '../icons/TextRight';
import { TypeBold } from '../icons/TypeBold';
import { TypeItalic } from '../icons/TypeItalic';
import { TypeStrikethrough } from '../icons/TypeStrikethrough';
import { TypeUnderline } from '../icons/TypeUnderline';

const LowPriority = 1;
type Selection = RangeSelection | NodeSelection | GridSelection | null;
const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

function Divider() {
  return <div className='divider' />;
}

function positionEditorElement(editor: any, rect: any) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2}px`;
  }
}

function FloatingLinkEditor({ editor }: { editor: any }) {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<Selection>(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection?.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      let rect;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: { editorState: any }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className='link-editor'>
      {isEditMode ? (
        <input
          ref={inputRef}
          className='link-input'
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className='link-input'>
            <a href={linkUrl} target='_blank' rel='noopener noreferrer'>
              {linkUrl}
            </a>
            <div
              className='link-edit'
              role='button'
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Select({ onChange, className, options, value }: any) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value='' />
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function BlockOptionsDropdownList({ editor, blockType, toolbarRef, setShowBlockOptionsDropDown }: any) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: any) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h1'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode('h2'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className='dropdown' ref={dropDownRef}>
      <button className='item' onClick={formatParagraph}>
        <span className='icon paragraph' />
        <span className='text'>Normal</span>
        {blockType === 'paragraph' && <span className='active' />}
      </button>
      <button className='item' onClick={formatLargeHeading}>
        <span className='icon large-heading' />
        <span className='text'>Large Heading</span>
        {blockType === 'h1' && <span className='active' />}
      </button>
      <button className='item' onClick={formatSmallHeading}>
        <span className='icon small-heading' />
        <span className='text'>Small Heading</span>
        {blockType === 'h2' && <span className='active' />}
      </button>
      <button className='item' onClick={formatBulletList}>
        <span className='icon bullet-list' />
        <span className='text'>Bullet List</span>
        {blockType === 'ul' && <span className='active' />}
      </button>
      <button className='item' onClick={formatNumberedList}>
        <span className='icon numbered-list' />
        <span className='text'>Numbered List</span>
        {blockType === 'ol' && <span className='active' />}
      </button>
      <button className='item' onClick={formatQuote}>
        <span className='icon quote' />
        <span className='text'>Quote</span>
        {blockType === 'quote' && <span className='active' />}
      </button>
      <button className='item' onClick={formatCode}>
        <span className='icon code' />
        <span className='text'>Code Block</span>
        {blockType === 'code' && <span className='active' />}
      </button>
    </div>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<any>();
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');

  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = (
            $isHeadingNode(element) ? element.getTag() : element.getType()
          ) as keyof typeof blockTypeToBlockName;
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: any) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className='flex justify-between bg-white p-2' ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, true);
        }}
        className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'>
        <ArrowCounterclockwise />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, true);
        }}
        className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'>
        <ArrowClockwise />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className='h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed space-x-2 px-2'
            onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
            aria-label='Formatting Options'>
            <span className={'icon block-type ' + blockType} />
            <span className='text'>{blockTypeToBlockName[blockType]}</span>
            <ChevronDown />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body,
            )}
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className='h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <ChevronDown />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isBold ? 'bg-stone-100' : '',
            )}
            aria-label='Format Bold'>
            <TypeBold />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isItalic ? 'bg-stone-100' : '',
            )}
            aria-label='Format Italics'>
            <TypeItalic />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isUnderline ? 'bg-stone-100' : '',
            )}
            aria-label='Format Underline'>
            <TypeUnderline />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            }}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isStrikethrough ? 'bg-stone-100' : '',
            )}
            aria-label='Format Strikethrough'>
            <TypeStrikethrough />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isCode ? 'bg-stone-100' : '',
            )}
            aria-label='Insert Code'>
            <Code />
          </button>
          <button
            onClick={insertLink}
            className={classNames(
              'w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed',
              isLink ? 'bg-stone-100' : '',
            )}
            aria-label='Insert Link'>
            <Link />
          </button>
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'
            aria-label='Left Align'>
            <TextLeft />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }}
            className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'
            aria-label='Center Align'>
            <TextCenter />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }}
            className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'
            aria-label='Right Align'>
            <TextRight />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }}
            className='w-8 h-8 rounded-md hover:bg-stone-200 flex items-center justify-center disabled:opacity-20 disabled:bg-white text-stone-500 cursor-pointer disabled:cursor-not-allowed'
            aria-label='Justify Align'>
            <Justify />
          </button>
        </>
      )}
    </div>
  );
}
