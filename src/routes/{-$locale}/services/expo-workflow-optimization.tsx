import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, Rocket, ShieldCheck } from "lucide-react";
import { ServiceChecklistSection } from "@/components/blocks/ServiceChecklistSection";
import { ServiceFaqSection } from "@/components/blocks/ServiceFaqSection";
import { ServiceHighlight } from "@/components/blocks/ServiceHighlight";
import { ServiceProcessSection } from "@/components/blocks/ServiceProcessSection";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, useAnalytics } from "@/lib/analytics";
import { SCHEDULE_VISIO_URL } from "@/lib/constants";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute(
	"/{-$locale}/services/expo-workflow-optimization",
)({
	loader: ({ location, serverContext }) => ({
		locale: resolveLocaleForPath(location.pathname, serverContext),
	}),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.services.workflow.title),
			description: t((t) => t.services.workflow.intro),
			path: "/services/expo-workflow-optimization",
			locale: loaderData.locale,
		});
	},
	component: ExpoWorkflowOptimizationPage,
});

function ExpoWorkflowOptimizationPage() {
	const { t, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	const outcomes = [
		t((t) => t.services.workflow.outcomes.item1),
		t((t) => t.services.workflow.outcomes.item2),
		t((t) => t.services.workflow.outcomes.item3),
		t((t) => t.services.workflow.outcomes.item4),
	];

	const focusAreas = [
		{
			title: t((t) => t.services.workflow.focusAreas.area1.title),
			description: t((t) => t.services.workflow.focusAreas.area1.description),
		},
		{
			title: t((t) => t.services.workflow.focusAreas.area2.title),
			description: t((t) => t.services.workflow.focusAreas.area2.description),
		},
		{
			title: t((t) => t.services.workflow.focusAreas.area3.title),
			description: t((t) => t.services.workflow.focusAreas.area3.description),
		},
	];

	const phases = [
		{
			title: t((t) => t.services.workflow.phases.discovery.title),
			description: t((t) => t.services.workflow.phases.discovery.description),
		},
		{
			title: t((t) => t.services.workflow.phases.migration.title),
			description: t((t) => t.services.workflow.phases.migration.description),
		},
		{
			title: t((t) => t.services.workflow.phases.launch.title),
			description: t((t) => t.services.workflow.phases.launch.description),
		},
	];

	const faqItems = [
		{
			question: t((t) => t.services.workflow.faq.item1.question),
			answer: t((t) => t.services.workflow.faq.item1.answer),
		},
		{
			question: t((t) => t.services.workflow.faq.item2.question),
			answer: t((t) => t.services.workflow.faq.item2.answer),
		},
		{
			question: t((t) => t.services.workflow.faq.item3.question),
			answer: t((t) => t.services.workflow.faq.item3.answer),
		},
		{
			question: t((t) => t.services.workflow.faq.item4.question),
			answer: t((t) => t.services.workflow.faq.item4.answer),
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
						{t((t) => t.services.workflow.title)}
					</h1>
					<p className="mt-4 text-lg text-slate-600 md:text-xl">
						{t((t) => t.services.workflow.intro)}
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<Button asChild>
							<a
								href={SCHEDULE_VISIO_URL}
								target="_blank"
								rel="noreferrer"
								onClick={() =>
									capture(ANALYTICS_EVENTS.ctaClick, {
										cta: "schedule_call",
										placement: "service_workflow",
										href: SCHEDULE_VISIO_URL,
									})
								}
							>
								{t((t) => t.services.workflow.cta)}
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
						title={t(
							(t) => t.services.workflow.highlights.releaseVelocity.title,
						)}
						description={t(
							(t) => t.services.workflow.highlights.releaseVelocity.description,
						)}
						icon={<Gauge className="size-5 text-teal-600" />}
					/>
					<ServiceHighlight
						title={t((t) => t.services.workflow.highlights.confidence.title)}
						description={t(
							(t) => t.services.workflow.highlights.confidence.description,
						)}
						icon={<ShieldCheck className="size-5 text-amber-600" />}
					/>
					<ServiceHighlight
						title={t((t) => t.services.workflow.highlights.handoff.title)}
						description={t(
							(t) => t.services.workflow.highlights.handoff.description,
						)}
						icon={<Rocket className="size-5 text-slate-700" />}
					/>
				</div>
			</section>

			<ServiceChecklistSection
				className="bg-white"
				label={t((t) => t.services.common.outcomesLabel)}
				title={t((t) => t.services.workflow.outcomesTitle)}
				description={t((t) => t.services.workflow.outcomesDescription)}
				items={outcomes}
			/>

			<section className="mx-auto w-full max-w-5xl px-6 py-16">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
							{t((t) => t.services.common.focusAreasLabel)}
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
							{t((t) => t.services.workflow.focusTitle)}
						</h2>
					</div>
					<p className="max-w-xl text-slate-600">
						{t((t) => t.services.workflow.focusDescription)}
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

			<ServiceProcessSection
				className="bg-white"
				label={t((t) => t.services.common.processLabel)}
				title={t((t) => t.services.workflow.processTitle)}
				description={t((t) => t.services.workflow.processDescription)}
				phases={phases}
			/>

			<ServiceFaqSection
				label={t((t) => t.services.common.faqLabel)}
				title={t((t) => t.services.workflow.faqTitle)}
				description={t((t) => t.services.workflow.faqDescription)}
				items={faqItems}
			/>
		</div>
	);
}
