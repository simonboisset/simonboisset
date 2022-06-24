import hljs from 'highlight.js';
import MarkDown from 'markdown-it';

const md = new MarkDown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return hljs.highlight(str, { language: 'javascript' }).value;
  },
});

export default function PreviewEditor({ content }: { content: any }) {
  const html = md.render(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
