import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "~/ui/button";
import { cn } from "~/ui/utils";

const Markdown = ({
  html,
  children,
}: {
  html?: string;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    hydrateCopyButtonInCodeBlocks();
  });

  return (
    <div
      className={cn("w-full max-w-screen-lg mx-auto px-12 py-16 markdown-body")}
    >
      {!!html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {children}
    </div>
  );
};

type CodeBlockProps = {
  code: string;
  className?: string;
};
const CodeBlock = ({ code, className }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copy = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);

    const text = getTextFromHtmlCodeBlock(code);

    if (!text) return;

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative">
      <Button
        onClick={copy}
        className={cn("absolute right-0 top-0")}
        variant="ghost"
        size="icon"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <code className={className} dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
};

const hydrateCopyButtonInCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll("pre > code");
  codeBlocks.forEach((block) => {
    if (!block.parentElement) return;

    const container = block.parentElement;

    // Vérifier si un root React existe déjà
    if (!container.dataset.reactRoot) {
      const root = createRoot(container);
      container.dataset.reactRoot = "true";

      const code = block.innerHTML;
      root.render(
        <React.Fragment>
          <CodeBlock code={code} className={block.className} />
          {/* Préserver le contenu original pour les lecteurs d'écran et le SEO */}
          <code
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </React.Fragment>
      );
    }
  });
};

export default Markdown;

const getTextFromHtmlCodeBlock = (code: string) => {
  const div = document.createElement("div");
  div.innerHTML = code;
  return div.textContent;
};
