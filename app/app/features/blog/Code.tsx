import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer';
import { CodeBlock } from './types/blocks';

var theme: PrismTheme = {
  plain: {
    color: '#d76a60',
    backgroundColor: '#1E1E1E',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)',
      },
    },
    {
      types: ['builtin', 'changed', 'keyword', 'interpolation-punctuation'],
      style: {
        color: '#9f54c4',
      },
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'rgb(181, 206, 168)',
      },
    },
    {
      types: ['constant'],
      style: {
        color: '#d76a60',
      },
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: 'rgb(222, 224, 116)',
      },
    },
    {
      types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
      style: {
        color: 'rgb(124, 206, 120)',
      },
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(213, 182, 115)',
      },
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'rgb(223, 209, 60)',
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(212, 212, 212)',
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(67, 153, 218)',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(223, 209, 60)',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)',
      },
    },
  ],
};

export default function Code({ caption, language, rich_text }: CodeBlock['code']) {
  return (
    <div className='py-2 '>
      <div className='bg-slate-700 rounded-lg flex flex-col relative'>
        {!!caption.length && (
          <div className='text-slate-300 px-4 text-opacity-70 italic text-sm border-b border-slate-500 py-1'>
            {caption.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </div>
        )}

        <Highlight
          {...defaultProps}
          code={rich_text.map((text) => text.plain_text).join(' ')}
          language={language}
          theme={theme}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              <button
                className='bg-slate-200 bg-opacity-5 z-10 hover:bg-opacity-10 active:bg-opacity-5 absolute right-6 -mr-3 text-slate-300 py-0.5 px-2 rounded-md'
                style={{ top: !!caption.length ? 36 : 10 }}>
                Copy
              </button>
              <pre className='px-4 relative py-3 overflow-x-auto'>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
}
