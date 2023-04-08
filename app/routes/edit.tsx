import { useOutletContext } from '@remix-run/react';
import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import { View } from '~/core/layout';
import { classNames } from '~/core/layout/utils';
import type { RootContext } from '~/root';
export default function Docs() {
  const { isFirstRender } = useOutletContext<RootContext>();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (!markdown) {
      setMarkdown(localStorage?.getItem('markdown') || '');
    } else {
      localStorage?.setItem('markdown', markdown);
    }
  }, [markdown]);

  const ref = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  const markup = { __html: marked(markdown) };

  const onClickBold = () => {
    let next = markdown.split('');
    if (ref.current?.selectionStart) {
      next[ref.current.selectionStart] = '**' + next[ref.current.selectionStart];
      next[ref.current.selectionEnd - 1] = next[ref.current.selectionEnd - 1] + '**';
      setMarkdown(next.join(''));
    }
  };
  const onClickCode = () => {
    let next = markdown.split('');
    if (ref.current?.selectionStart) {
      next[ref.current.selectionStart] = '`' + next[ref.current.selectionStart];
      next[ref.current.selectionEnd - 1] = next[ref.current.selectionEnd - 1] + '`';
      setMarkdown(next.join(''));
    }
  };

  return (
    <View isFirstRender={isFirstRender}>
      <div className='flex flex-row flex-1 space-x-8 max-w-7xl mx-auto h-screen'>
        <div className='flex flex-col relative flex-1 rounded-xl h-5/6 resize-none bg-white overflow-hidden'>
          <div className='left-2 right-2 flex flex-row bg-gray-100 h-12 items-center justify-center px-4 py-2 rounded-xl space-x-2 absolute top-2 shadow-md z-10'>
            <button onClick={onClickBold} className={buttonStyle}>
              B
            </button>
            <button onClick={onClickCode} className={buttonStyle}>
              {'<>'}
            </button>
          </div>
          <textarea
            ref={ref}
            value={markdown}
            onChange={handleChange}
            className='appearance-none outline-none py-16 px-8 resize-none overflow-y-scroll absolute top-0 bottom-0 left-0 right-0'
          />
        </div>
        <div className='rounded-xl overflow-hidden flex-1 appearance-none outline-none h-5/6'>
          <div
            dangerouslySetInnerHTML={markup}
            className={classNames(
              'flex-1 appearance-none outline-none p-8 h-full overflow-y-scroll',
              'bg-white prose prose-headings:text-transparent',
              'prose-headings:bg-clip-text prose-headings:bg-gradient-to-l prose-headings:from-gray-500',
              'prose-headings:to-gray-500 prose-p:text-black prose-li:text-black prose-p:text-justify',
              'prose-a:underline prose-a:font-bold prose-a:text-black',
              'prose-img:rounded-xl prose-img:m-4',
              'prose-code:bg-gray-300 prose-code:rounded-md prose-code:py-1 prose-code:px-2 prose-code:after:hidden prose-code:before:hidden',
            )}
          />
        </div>
      </div>
    </View>
  );
}

const buttonStyle =
  'h-8 w-8 rounded-lg flex flex-row text-sm font-semibold items-center justify-center hover:bg-gray-300 bg-gray-200 active:bg-gray-200 transition-all text-gray-600';
