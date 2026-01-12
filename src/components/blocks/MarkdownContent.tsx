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
				"prose mx-auto max-w-none text-slate-700 prose-headings:text-slate-900 " +
				"prose-p:leading-relaxed prose-a:text-teal-700 prose-a:font-semibold " +
				"prose-img:rounded-2xl prose-img:shadow-lg prose-img:object-cover " +
				(className ? ` ${className}` : "")
			}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
}
