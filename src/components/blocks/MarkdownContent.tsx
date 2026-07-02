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
				"font-mono prose prose-invert mx-auto w-full min-w-0 max-w-none break-words text-muted-foreground prose-headings:font-display prose-headings:text-foreground " +
				"prose-p:leading-relaxed prose-a:text-secondary prose-a:font-semibold " +
				"[& :not(pre)>code]:break-words [& :not(pre)>code]:whitespace-pre-wrap " +
				"prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-pre:break-normal prose-pre:rounded-lg prose-pre:border-2 prose-pre:border-secondary prose-pre:bg-background prose-pre:shadow-hard-button " +
				"[& pre code]:whitespace-pre [& pre code]:break-normal " +
				"prose-img:rounded-lg prose-img:border-2 prose-img:border-secondary prose-img:shadow-hard-md prose-img:object-cover " +
				(className ? ` ${className}` : "")
			}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
}
