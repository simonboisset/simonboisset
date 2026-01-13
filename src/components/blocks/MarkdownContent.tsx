type MarkdownContentProps = {
	contentHtml: string;
	className?: string;
};

export default function MarkdownContent({
	contentHtml,
	className,
}: MarkdownContentProps) {
	return (
		<div
			className={
				"prose mx-auto w-full min-w-0 max-w-none break-words text-slate-700 prose-headings:text-slate-900 " +
				"prose-p:leading-relaxed prose-a:text-teal-700 prose-a:font-semibold " +
				"[& :not(pre)>code]:break-words [& :not(pre)>code]:whitespace-pre-wrap " +
				"prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-pre:break-normal " +
				"[& pre code]:whitespace-pre [& pre code]:break-normal " +
				"prose-img:rounded-2xl prose-img:shadow-lg prose-img:object-cover " +
				(className ? ` ${className}` : "")
			}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
}
