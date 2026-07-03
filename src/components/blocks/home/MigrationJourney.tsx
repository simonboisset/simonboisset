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

const migrationCardPositions = [
	"lg:col-start-1 lg:row-start-1",
	"lg:col-start-2 lg:row-start-1",
	"lg:col-start-3 lg:row-start-1",
	"lg:col-start-3 lg:row-start-2",
	"lg:col-start-2 lg:row-start-2",
	"lg:col-start-1 lg:row-start-2",
];

const migrationCardStateClassNames: Record<MigrationProgressStatus, string> = {
	pending:
		"border-[color:color-mix(in_srgb,var(--foreground)_28%,transparent)]",
	current:
		"border-accent shadow-[var(--shadow-hard-lg),0_0_0_1px_color-mix(in_srgb,var(--accent)_44%,transparent)]",
	done: "border-secondary",
};

const migrationNodeStateClassNames: Record<MigrationProgressStatus, string> = {
	pending: "text-[color:color-mix(in_srgb,var(--foreground)_46%,transparent)]",
	current: "text-accent",
	done: "text-secondary",
};

const migrationStatusStateClassNames: Record<MigrationProgressStatus, string> =
	{
		pending:
			"text-[color:color-mix(in_srgb,var(--foreground)_68%,transparent)]",
		current: "text-accent",
		done: "text-secondary",
	};

const migrationOutputStateClassNames: Record<MigrationProgressStatus, string> =
	{
		pending:
			"border-t-[color:color-mix(in_srgb,var(--foreground)_20%,transparent)] text-[color:color-mix(in_srgb,var(--foreground)_46%,transparent)]",
		current:
			"border-t-[color:color-mix(in_srgb,var(--accent)_44%,transparent)] text-accent",
		done: "border-t-[color:color-mix(in_srgb,var(--secondary)_26%,transparent)] text-secondary",
	};

const migrationSpinnerClassName =
	"size-[0.82rem] rounded-full border-2 border-current border-t-transparent";

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
		<div className="mt-12 grid gap-4">
			<div
				className="relative grid gap-8 lg:min-h-[42rem] lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(17rem,auto))] lg:gap-x-16 lg:gap-y-24 lg:py-10"
				style={
					{
						"--migration-progress": progressRatio,
					} as CSSProperties
				}
			>
				<svg
					aria-hidden="true"
					className="pointer-events-none hidden lg:absolute lg:inset-0 lg:z-0 lg:block lg:size-full lg:overflow-visible"
					focusable="false"
					preserveAspectRatio="none"
					viewBox="0 0 1000 460"
				>
					<path
						className="fill-none stroke-[4] stroke-[color:color-mix(in_srgb,var(--secondary)_34%,transparent)] [stroke-linecap:square] [stroke-linejoin:miter]"
						d="M 150 116 H 500 H 850 V 344 H 500 H 150"
					/>
					<path
						className="fill-none stroke-5 stroke-accent transition-[stroke-dasharray] duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] [filter:drop-shadow(4px_4px_0_var(--shadow-hard))] [stroke-dasharray:var(--migration-progress)_1] [stroke-linecap:square] [stroke-linejoin:miter]"
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
								"migration-progress-card z-[1] min-h-[17rem] w-full overflow-hidden bg-[color-mix(in_srgb,var(--card)_98%,black)] p-5 motion-safe:animate-fade-up lg:min-h-[18rem]",
								migrationCardStateClassNames[status],
								migrationCardPositions[index],
							)}
							data-state={status}
							key={`${item.label}-${item.title}`}
							style={{ animationDelay: `${index * 140}ms` }}
						>
							<div className="flex items-start justify-between gap-4">
								<span
									className={cn(
										"grid size-12 shrink-0 place-items-center rounded-lg border-2 border-current bg-background shadow-hard-button",
										migrationNodeStateClassNames[status],
									)}
									aria-hidden="true"
								>
									<Icon className="size-5" />
								</span>
								<span
									className={cn(
										"inline-flex min-w-[7.4rem] items-center justify-center gap-[0.45rem] rounded-lg border-2 border-current bg-background px-[0.6rem] py-[0.32rem] text-[0.72rem] leading-[1.1] uppercase shadow-hard-sm",
										migrationStatusStateClassNames[status],
									)}
									data-state={status}
								>
									<span
										className={cn(
											migrationSpinnerClassName,
											status === "current"
												? "inline-block animate-migration-spinner"
												: "hidden",
										)}
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
								<p
									className={cn(
										"mt-5 flex items-start gap-2 border-t pt-4 text-sm leading-[1.5] transition-[color,border-color] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
										migrationOutputStateClassNames[status],
									)}
									data-state={status}
								>
									<span
										className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center"
										aria-hidden="true"
									>
										<span
											className={cn(
												migrationSpinnerClassName,
												status === "current"
													? "inline-block animate-migration-spinner"
													: "hidden",
											)}
										/>
										{status === "done" ? (
											<CheckCircle2 className="size-4" />
										) : null}
									</span>
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
