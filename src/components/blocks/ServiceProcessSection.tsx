import { cn } from "@/lib/utils";

type ServicePhase = {
	title: string;
	description: string;
};

type ServiceProcessSectionProps = {
	label: string;
	title: string;
	description: string;
	phases: ServicePhase[];
	className?: string;
};

export function ServiceProcessSection({
	label,
	title,
	description,
	phases,
	className,
}: ServiceProcessSectionProps) {
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
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{phases.map((phase, index) => (
						<div
							key={phase.title}
							className="terminal-card animate-terminal-reveal p-6"
							style={{ animationDelay: `${index * 120}ms` }}
						>
							<p className="terminal-label mb-3">
								{String(index + 1).padStart(2, "0")} LOG
							</p>
							<h3 className="terminal-heading text-lg">{phase.title}</h3>
							<p className="terminal-muted mt-3 text-sm">{phase.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
