import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Layers, Rocket, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCHEDULE_VISIO_URL } from "@/lib/constants";

export const Route = createFileRoute("/services/react-native-legacy-to-expo")({
	component: LegacyToExpoPage,
});

function LegacyToExpoPage() {
	const deliverables = [
		"Technical audit of the existing React Native stack",
		"Expo migration roadmap with risk assessment",
		"Module-by-module upgrade plan with fallback paths",
		"EAS build, submit, and OTA update pipeline",
		"QA plan with release checklist",
	];

	const phases = [
		{
			title: "Discovery + audit",
			description:
				"Codebase review, dependency mapping, and migration feasibility analysis.",
		},
		{
			title: "Migration execution",
			description:
				"Incremental upgrades, module replacements, and Expo configuration setup.",
		},
		{
			title: "Launch + handoff",
			description:
				"Stabilization, release management, and documentation for your team.",
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
						React Native legacy to Expo migration
					</h1>
					<p className="mt-4 text-lg text-slate-600 md:text-xl">
						Modernize your mobile stack without breaking the roadmap. I guide
						teams through a safe migration to Expo, unlocking faster builds and
						a stable release process.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<Button asChild>
							<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
								Plan a migration
							</a>
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
						title="Stack alignment"
						description="Bring Expo, React Native, and native modules into a supported baseline."
						icon={<Layers className="size-5 text-teal-600" />}
					/>
					<ServiceHighlight
						title="Predictable releases"
						description="Set up EAS pipelines, OTA updates, and release playbooks."
						icon={<Workflow className="size-5 text-amber-600" />}
					/>
					<ServiceHighlight
						title="Launch-ready handoff"
						description="Documented workflows and team enablement for the next sprint."
						icon={<Rocket className="size-5 text-slate-700" />}
					/>
				</div>
			</section>

			<section className="bg-white py-16">
				<div className="mx-auto w-full max-w-5xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								Deliverables
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								What you receive
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							A detailed roadmap, upgraded codebase, and release process you can
							confidently own.
						</p>
					</div>
					<ul className="mt-8 grid gap-4 md:grid-cols-2">
						{deliverables.map((item) => (
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
							Process
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
							A staged migration with low risk
						</h2>
					</div>
					<p className="max-w-xl text-slate-600">
						Each phase is scoped to keep your team shipping while the migration
						progresses.
					</p>
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
