import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, Rocket, Workflow } from "lucide-react";
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
	const { capture } = useAnalytics();
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

	const outcomes = [
		t((t) => t.services.legacy.outcomes.item1),
		t((t) => t.services.legacy.outcomes.item2),
		t((t) => t.services.legacy.outcomes.item3),
		t((t) => t.services.legacy.outcomes.item4),
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

	const faqItems = [
		{
			question: t((t) => t.services.legacy.faq.item1.question),
			answer: t((t) => t.services.legacy.faq.item1.answer),
		},
		{
			question: t((t) => t.services.legacy.faq.item2.question),
			answer: t((t) => t.services.legacy.faq.item2.answer),
		},
		{
			question: t((t) => t.services.legacy.faq.item3.question),
			answer: t((t) => t.services.legacy.faq.item3.answer),
		},
		{
			question: t((t) => t.services.legacy.faq.item4.question),
			answer: t((t) => t.services.legacy.faq.item4.answer),
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
							<a
								href={SCHEDULE_VISIO_URL}
								target="_blank"
								rel="noreferrer"
								onClick={() =>
									capture(ANALYTICS_EVENTS.ctaClick, {
										cta: "schedule_call",
										placement: "service_legacy",
										href: SCHEDULE_VISIO_URL,
									})
								}
							>
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

			<ServiceChecklistSection
				className="bg-white"
				label={t((t) => t.services.common.outcomesLabel)}
				title={t((t) => t.services.legacy.outcomesTitle)}
				description={t((t) => t.services.legacy.outcomesDescription)}
				items={outcomes}
			/>

			<ServiceChecklistSection
				label={t((t) => t.services.common.deliverablesLabel)}
				title={t((t) => t.services.legacy.deliverablesIntroTitle)}
				description={t((t) => t.services.legacy.deliverablesIntroDescription)}
				items={deliverables}
			/>

			<ServiceProcessSection
				label={t((t) => t.services.common.processLabel)}
				title={t((t) => t.services.legacy.processTitle)}
				description={t((t) => t.services.legacy.processDescription)}
				phases={phases}
			/>

			<ServiceFaqSection
				label={t((t) => t.services.common.faqLabel)}
				title={t((t) => t.services.legacy.faqTitle)}
				description={t((t) => t.services.legacy.faqDescription)}
				items={faqItems}
			/>
		</div>
	);
}
