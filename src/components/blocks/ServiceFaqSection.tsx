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
		<section className={cn("py-16", className)}>
			<div className="mx-auto w-full max-w-5xl px-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
							{label}
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
							{title}
						</h2>
					</div>
					<p className="max-w-xl text-slate-600">{description}</p>
				</div>
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{items.map((item) => (
						<div
							key={item.question}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<h3 className="text-lg font-semibold text-slate-900">
								{item.question}
							</h3>
							<p className="mt-3 text-sm text-slate-600">{item.answer}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
