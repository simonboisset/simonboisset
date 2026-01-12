import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Gauge, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/expo-workflow-optimization")({
	component: ExpoWorkflowOptimizationPage,
});

function ExpoWorkflowOptimizationPage() {
	const outcomes = [
		"Faster build and submit times",
		"Stable CI/CD for iOS + Android",
		"Clear release checklists and monitoring",
		"Environment configuration and secrets audit",
	];

	const focusAreas = [
		{
			title: "EAS pipeline tuning",
			description:
				"Optimize build profiles, caching, and parallelization for predictable releases.",
		},
		{
			title: "Workflow reliability",
			description:
				"Upgrade SDKs, clean dependency graphs, and reduce flaky build failures.",
		},
		{
			title: "Release visibility",
			description:
				"Add release notes, monitoring, and post-release review systems.",
		},
	];

	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Productized service
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						Expo workflow optimisation
					</h1>
					<p className="mt-4 text-lg text-slate-600 md:text-xl">
						Make builds faster, releases calmer, and handoffs clearer. I refine
						Expo pipelines so your team ships reliably every sprint.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<Button asChild>
							<a href="mailto:hello@simonboisset.dev">Optimize my workflow</a>
						</Button>
						<Button variant="outline" asChild>
							<Link to="/">Back to home</Link>
						</Button>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-5xl px-6 py-16">
				<div className="grid gap-6 md:grid-cols-3">
					<ServiceHighlight
						title="Release velocity"
						description="Shorter build times and fewer manual steps."
						icon={<Gauge className="size-5 text-teal-600" />}
					/>
					<ServiceHighlight
						title="Confidence"
						description="Clear deployment guardrails and rollback paths."
						icon={<ShieldCheck className="size-5 text-amber-600" />}
					/>
					<ServiceHighlight
						title="Team handoff"
						description="Documentation and playbooks for every release."
						icon={<Rocket className="size-5 text-slate-700" />}
					/>
				</div>
			</section>

			<section className="bg-white py-16">
				<div className="mx-auto w-full max-w-5xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								Outcomes
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								Workflow improvements you can feel
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							Identify bottlenecks, streamline approvals, and keep releases calm.
						</p>
					</div>
					<ul className="mt-8 grid gap-4 md:grid-cols-2">
						{outcomes.map((item) => (
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

			<section className="mx-auto w-full max-w-5xl px-6 py-16">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
							Focus areas
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
							From CI/CD to release observability
						</h2>
					</div>
					<p className="max-w-xl text-slate-600">
						I target the workflow steps that create delays, handoffs, and
						unplanned downtime.
					</p>
				</div>
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{focusAreas.map((area) => (
						<div
							key={area.title}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<h3 className="text-lg font-semibold text-slate-900">
								{area.title}
							</h3>
							<p className="mt-3 text-sm text-slate-600">{area.description}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

function ServiceHighlight({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-center gap-3">
				<span className="rounded-full bg-slate-100 p-2">{icon}</span>
				<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
			</div>
			<p className="mt-4 text-sm text-slate-600">{description}</p>
		</div>
	);
}
