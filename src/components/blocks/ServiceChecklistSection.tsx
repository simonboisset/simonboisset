import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceChecklistSectionProps = {
	label: string;
	title: string;
	description: string;
	items: string[];
	className?: string;
};

export function ServiceChecklistSection({
	label,
	title,
	description,
	items,
	className,
}: ServiceChecklistSectionProps) {
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
				<ul className="mt-8 grid gap-4 md:grid-cols-2">
					{items.map((item) => (
						<li
							key={item}
							className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
						>
							<CheckCircle2 className="size-4 text-emerald-600" />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
