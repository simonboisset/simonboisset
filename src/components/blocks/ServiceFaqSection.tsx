import { cn } from "@/lib/utils";

type FaqItem = {
	question: string;
	answer: string;
};

type ServiceFaqSectionProps = {
	label: string;
	title: string;
	description: string;
	items: FaqItem[];
	className?: string;
};

export function ServiceFaqSection({
	label,
	title,
	description,
	items,
	className,
}: ServiceFaqSectionProps) {
	return (
		<section className={cn("terminal-section py-16", className)}>
			<div className="mx-auto w-full max-w-5xl px-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="terminal-label">{label}</p>
						<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
							{title}
						</h2>
					</div>
					<p className="terminal-muted max-w-xl">{description}</p>
				</div>
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{items.map((item) => (
						<div key={item.question} className="terminal-card p-6">
							<h3 className="terminal-heading text-lg">{item.question}</h3>
							<p className="terminal-muted mt-3 text-sm">{item.answer}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
