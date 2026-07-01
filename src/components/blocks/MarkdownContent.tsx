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
				"terminal-prose prose prose-invert mx-auto w-full min-w-0 max-w-none break-words text-muted-foreground prose-headings:text-foreground " +
				"prose-p:leading-relaxed prose-a:text-secondary prose-a:font-semibold " +
				"[& :not(pre)>code]:break-words [& :not(pre)>code]:whitespace-pre-wrap " +
				"prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-pre:break-normal prose-pre:rounded-[var(--radius)] prose-pre:border-2 prose-pre:border-secondary prose-pre:bg-background prose-pre:shadow-[4px_4px_0_var(--terminal-shadow)] " +
				"[& pre code]:whitespace-pre [& pre code]:break-normal " +
				"prose-img:rounded-[var(--radius)] prose-img:border-2 prose-img:border-secondary prose-img:shadow-[6px_6px_0_var(--terminal-shadow)] prose-img:object-cover " +
				(className ? ` ${className}` : "")
			}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
}
