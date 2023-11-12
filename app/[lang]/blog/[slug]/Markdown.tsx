'use client';

import { Button } from '@/ui/button';
import { cn } from '@/ui/utils';
import hljs from 'highlight.js';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const Markdown = ({ html }: { html: string }) => {
  useEffect(() => {
    hydrateCopyButtonInCodeBlocks();
  });

  return (
    <div
      className={cn(
        'prose mx-auto prose-p:text-justify prose-a:underline prose-a:font-bold',
        'prose-img:rounded-lg prose-img:shadow-lg prose-img:object-cover prose-img:p-0',
        'prose-headings:text-primary prose-p:text-primary',
        'prose-li:text-primary prose-a:text-primary prose-li:marker:text-primary',
        'w-full max-w-screen-lg mx-auto mt-32 px-12 prose-pre:p-0 prose-pre:rounded-xl',
        'prose-pre:border prose-pre:border-primary-foreground/30 prose-pre:relative',
        'prose-code:text-primary/80 prose-code:bg-foreground/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-[4px]',
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

type CodeBlockProps = {
  code: string;
  language: string;
};
const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copy = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);

    navigator.clipboard.writeText(code);
  };
  const lang = hljs.getLanguage(language) ? language : 'plaintext';

  // parse special characters
  const formatedCode = code
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const codeHtml = hljs.highlight(formatedCode, { language: lang }).value;

  return (
    <>
      <Button onClick={copy} className={cn('absolute right-1 top-1')} variant='ghost' size='square'>
        {isCopied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
      </Button>
      <code className={`hljs language-${lang}`} dangerouslySetInnerHTML={{ __html: codeHtml }} />
    </>
  );
};

const hydrateCopyButtonInCodeBlocks = async () => {
  const codeBlocks = document.querySelectorAll('pre > code');
  codeBlocks.forEach((block) => {
    if (!block.parentElement) {
      return;
    }
    const root = createRoot(block.parentElement);
    const code = block.innerHTML;
    const lang = block.className.replace('language-', '');

    root.render(<CodeBlock code={code} language={lang} />);
  });
};

export default Markdown;
