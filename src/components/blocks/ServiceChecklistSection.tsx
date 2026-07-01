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
				<ul className="mt-8 grid gap-4 md:grid-cols-2">
					{items.map((item) => (
						<li
							key={item}
							className="terminal-card flex items-start gap-3 p-4 text-sm"
						>
							<CheckCircle2 className="mt-0.5 size-4 text-secondary" />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
