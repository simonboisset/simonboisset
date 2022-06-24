import MarkDown from 'markdown-it';

const md = new MarkDown();
export default function PreviewEditor({ content }: { content: any }) {
  const html = md.render(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
