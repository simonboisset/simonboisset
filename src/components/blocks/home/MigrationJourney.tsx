import { CheckCircle2 } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type {
	MigrationGate,
	MigrationPhase,
	MigrationProgressItem,
	MigrationProgressStatus,
	MigrationStatusLabels,
} from "./types";

export function MigrationJourney({
	start,
	phases,
	end,
	statusLabels,
}: {
	start: MigrationGate;
	phases: MigrationPhase[];
	end: MigrationGate;
	statusLabels: MigrationStatusLabels;
}) {
	const journeyItems = useMemo<MigrationProgressItem[]>(
		() => [
			{
				description: start.description,
				icon: start.icon,
				label: start.label,
				title: start.title,
			},
			...phases.map((phase, index) => ({
				description: phase.description,
				icon: phase.icon,
				label: phase.eyebrow,
				outcome: phase.outcome,
				step: String(index + 1).padStart(2, "0"),
				title: phase.title,
			})),
			{
				description: end.description,
				icon: end.icon,
				label: end.label,
				title: end.title,
			},
		],
		[end.description, end.icon, end.label, end.title, phases, start],
	);
	const [activeIndex, setActiveIndex] = useState(0);
	const prefersReducedMotion = usePrefersReducedMotion();
	const lastItemIndex = journeyItems.length - 1;
	const completeIndex = journeyItems.length;
	const progressRatio = prefersReducedMotion
		? 1
		: Math.min(activeIndex, lastItemIndex) / Math.max(1, lastItemIndex);

	useEffect(() => {
		if (prefersReducedMotion) {
			setActiveIndex(completeIndex);
			return;
		}

		const delay = activeIndex >= completeIndex ? 5000 : 1900;
		const timeout = window.setTimeout(() => {
			setActiveIndex((index) => (index >= completeIndex ? 0 : index + 1));
		}, delay);

		return () => window.clearTimeout(timeout);
	}, [activeIndex, completeIndex, prefersReducedMotion]);

	return (
		<div className="migration-progress-board mt-12">
			<div
				className="migration-progress-grid"
				style={
					{
						"--migration-progress": progressRatio,
					} as CSSProperties
				}
			>
				<svg
					aria-hidden="true"
					className="migration-progress-path"
					focusable="false"
					preserveAspectRatio="none"
					viewBox="0 0 1000 460"
				>
					<path
						className="migration-progress-path-track"
						d="M 150 116 H 500 H 850 V 344 H 500 H 150"
					/>
					<path
						className="migration-progress-path-progress"
						d="M 150 116 H 500 H 850 V 344 H 500 H 150"
						pathLength="1"
					/>
				</svg>
				{journeyItems.map((item, index) => {
					const Icon = item.icon;
					const status: MigrationProgressStatus = prefersReducedMotion
						? "done"
						: activeIndex > index
							? "done"
							: activeIndex === index
								? "current"
								: "pending";

					return (
						<article
							aria-current={status === "current" ? "step" : undefined}
							className={cn(
								cardVariants(),
								"migration-progress-card p-5 motion-safe:animate-fade-up",
								`migration-progress-card-${index + 1}`,
							)}
							data-state={status}
							key={`${item.label}-${item.title}`}
							style={{ animationDelay: `${index * 140}ms` }}
						>
							<div className="flex items-start justify-between gap-4">
								<span className="migration-progress-node" aria-hidden="true">
									<Icon className="size-5" />
								</span>
								<span className="migration-progress-status" data-state={status}>
									<span
										className="migration-progress-spinner"
										aria-hidden="true"
									/>
									{status === "done" ? (
										<CheckCircle2 className="size-4" aria-hidden="true" />
									) : null}
									{statusLabels[status]}
								</span>
							</div>
							<div className="mt-5 flex items-center gap-3">
								{item.step ? (
									<Badge className="flex h-9 w-12 items-center justify-center p-0">
										{item.step}
									</Badge>
								) : null}
								<p className="text-kicker">{item.label}</p>
							</div>
							<h3 className="text-heading mt-3 text-xl">{item.title}</h3>
							<p className="text-body-muted mt-3 text-sm">{item.description}</p>
							{"outcome" in item && item.outcome ? (
								<p className="migration-progress-output mt-5">
									<CheckCircle2 className="mt-0.5 size-4 shrink-0" />
									<span>{item.outcome}</span>
								</p>
							) : null}
						</article>
					);
				})}
			</div>
		</div>
	);
}
