import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Layers, Rocket, Workflow } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { SCHEDULE_VISIO_URL } from "@/lib/constants";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute(
	"/{-$locale}/services/react-native-legacy-to-expo",
)({
	loader: ({ location, serverContext }) => ({
		locale: resolveLocaleForPath(location.pathname, serverContext),
	}),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.services.legacy.title),
			description: t((t) => t.services.legacy.intro),
			path: "/services/react-native-legacy-to-expo",
			locale: loaderData.locale,
		});
	},
	component: LegacyToExpoPage,
});

function LegacyToExpoPage() {
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	const deliverables = [
		t((t) => t.services.legacy.deliverables.item1),
		t((t) => t.services.legacy.deliverables.item2),
		t((t) => t.services.legacy.deliverables.item3),
		t((t) => t.services.legacy.deliverables.item4),
		t((t) => t.services.legacy.deliverables.item5),
	];

	const phases = [
		{
			title: t((t) => t.services.legacy.phases.discovery.title),
			description: t((t) => t.services.legacy.phases.discovery.description),
		},
		{
			title: t((t) => t.services.legacy.phases.migration.title),
			description: t((t) => t.services.legacy.phases.migration.description),
		},
		{
			title: t((t) => t.services.legacy.phases.launch.title),
			description: t((t) => t.services.legacy.phases.launch.description),
		},
	];

	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						{t((t) => t.services.common.productizedLabel)}
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						{t((t) => t.services.legacy.title)}
					</h1>
					<p className="mt-4 text-lg text-slate-600 md:text-xl">
						{t((t) => t.services.legacy.intro)}
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<Button asChild>
							<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
								{t((t) => t.services.legacy.cta)}
							</a>
						</Button>
						<Button variant="outline" asChild>
							<Link to="/{-$locale}" params={localeParams}>
								{t((t) => t.services.common.backHome)}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-5xl px-6 py-16">
				<div className="grid gap-6 md:grid-cols-3">
					<ServiceHighlight
						title={t((t) => t.services.legacy.highlights.stackAlignment.title)}
						description={t(
							(t) => t.services.legacy.highlights.stackAlignment.description,
						)}
						icon={<Layers className="size-5 text-teal-600" />}
					/>
					<ServiceHighlight
						title={t(
							(t) => t.services.legacy.highlights.predictableReleases.title,
						)}
						description={t(
							(t) =>
								t.services.legacy.highlights.predictableReleases.description,
						)}
						icon={<Workflow className="size-5 text-amber-600" />}
					/>
					<ServiceHighlight
						title={t((t) => t.services.legacy.highlights.handoff.title)}
						description={t(
							(t) => t.services.legacy.highlights.handoff.description,
						)}
						icon={<Rocket className="size-5 text-slate-700" />}
					/>
				</div>
			</section>

			<section className="bg-white py-16">
				<div className="mx-auto w-full max-w-5xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								{t((t) => t.services.common.deliverablesLabel)}
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								{t((t) => t.services.legacy.deliverablesIntroTitle)}
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							{t((t) => t.services.legacy.deliverablesIntroDescription)}
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
							{t((t) => t.services.common.processLabel)}
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
							{t((t) => t.services.legacy.processTitle)}
						</h2>
					</div>
					<p className="max-w-xl text-slate-600">
						{t((t) => t.services.legacy.processDescription)}
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
