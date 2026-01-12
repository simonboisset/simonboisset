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
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{phases.map((phase) => (
						<div
							key={phase.title}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<h3 className="text-lg font-semibold text-slate-900">
								{phase.title}
							</h3>
							<p className="mt-3 text-sm text-slate-600">{phase.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
