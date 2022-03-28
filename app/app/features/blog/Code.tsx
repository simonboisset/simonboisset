import Highlight, { defaultProps } from 'prism-react-renderer';
import { CodeBlock } from './types/blocks';

export default function Code({ caption, language, rich_text }: CodeBlock['code']) {
  return (
    <div className='py-2'>
      <div className='bg-slate-700 rounded-lg flex flex-col'>
        {!!caption.length && (
          <div className='text-slate-300 px-4 text-opacity-70 italic text-sm border-b border-slate-500 py-1'>
            {caption.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </div>
        )}
        <Highlight {...defaultProps} code={rich_text.map((text) => text.plain_text).join(' ')} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className='px-4 relative py-3'>
              <button className='bg-slate-200 bg-opacity-5 hover:bg-opacity-10 active:bg-opacity-5 absolute right-6 top-2.5 -mr-3 text-slate-300 py-0.5 px-2 rounded-md'>
                Copy
              </button>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
