import {
	FileSearch,
	GitBranch,
	Rocket,
	Smartphone,
	Wrench,
} from "lucide-react";
import type { useI18n } from "@/lib/i18n/use-i18n";
import type { HomeAssets, HomeContent } from "./types";

type Translator = ReturnType<typeof useI18n>["t"];

export function buildHomeContent(
	t: Translator,
	assets: Pick<
		HomeAssets,
		"legacyServiceIllustrationUrl" | "workflowServiceIllustrationUrl"
	>,
): HomeContent {
	return {
		hero: {
			eyebrow: t((t) => t.home.hero.eyebrow),
			title: t((t) => t.home.hero.title),
			intro: t((t) => t.home.hero.intro),
			ctaPrimary: t((t) => t.home.hero.ctaPrimary),
			ctaSecondary: t((t) => t.home.hero.ctaSecondary),
			highlights: {
				expertise: t((t) => t.home.hero.highlights.expertise),
				delivery: t((t) => t.home.hero.highlights.delivery),
				performance: t((t) => t.home.hero.highlights.performance),
			},
		},
		servicesSection: {
			title: t((t) => t.home.servicesSection.title),
			description: t((t) => t.home.servicesSection.description),
		},
		testimonialsSection: {
			title: t((t) => t.home.testimonialsSection.title),
			description: t((t) => t.home.testimonialsSection.description),
		},
		methodSection: {
			label: t((t) => t.home.method.label),
			title: t((t) => t.home.method.title),
			description: t((t) => t.home.method.description),
		},
		cta: {
			title: t((t) => t.home.cta.title),
			description: t((t) => t.home.cta.description),
			button: t((t) => t.home.cta.button),
		},
		testimonials: [
			{
				name: t((t) => t.home.testimonials.eric.name),
				quote: t((t) => t.home.testimonials.eric.quote),
			},
			{
				name: t((t) => t.home.testimonials.julie.name),
				quote: t((t) => t.home.testimonials.julie.quote),
			},
			{
				name: t((t) => t.home.testimonials.matthieu.name),
				quote: t((t) => t.home.testimonials.matthieu.quote),
			},
			{
				name: t((t) => t.home.testimonials.thomas.name),
				quote: t((t) => t.home.testimonials.thomas.quote),
			},
			{
				name: t((t) => t.home.testimonials.julien.name),
				quote: t((t) => t.home.testimonials.julien.quote),
			},
			{
				name: t((t) => t.home.testimonials.antoine.name),
				quote: t((t) => t.home.testimonials.antoine.quote),
			},
		],
		riskCards: [
			{
				title: t((t) => t.home.risks.native.title),
				description: t((t) => t.home.risks.native.description),
				bullet: t((t) => t.home.risks.native.bullet),
			},
			{
				title: t((t) => t.home.risks.delivery.title),
				description: t((t) => t.home.risks.delivery.description),
				bullet: t((t) => t.home.risks.delivery.bullet),
			},
			{
				title: t((t) => t.home.risks.stores.title),
				description: t((t) => t.home.risks.stores.description),
				bullet: t((t) => t.home.risks.stores.bullet),
			},
			{
				title: t((t) => t.home.risks.handoff.title),
				description: t((t) => t.home.risks.handoff.description),
				bullet: t((t) => t.home.risks.handoff.bullet),
			},
		],
		offerTracks: [
			{
				label: t((t) => t.home.offerTracks.migration.label),
				title: t((t) => t.home.offerTracks.migration.title),
				description: t((t) => t.home.offerTracks.migration.description),
				bullets: [
					t((t) => t.home.offerTracks.migration.bullets.item1),
					t((t) => t.home.offerTracks.migration.bullets.item2),
					t((t) => t.home.offerTracks.migration.bullets.item3),
				],
				illustrationUrl: assets.legacyServiceIllustrationUrl,
			},
			{
				label: t((t) => t.home.offerTracks.workflow.label),
				title: t((t) => t.home.offerTracks.workflow.title),
				description: t((t) => t.home.offerTracks.workflow.description),
				bullets: [
					t((t) => t.home.offerTracks.workflow.bullets.item1),
					t((t) => t.home.offerTracks.workflow.bullets.item2),
					t((t) => t.home.offerTracks.workflow.bullets.item3),
				],
				illustrationUrl: assets.workflowServiceIllustrationUrl,
			},
		],
		migrationPhases: [
			{
				eyebrow: t((t) => t.home.method.audit.eyebrow),
				title: t((t) => t.home.method.audit.title),
				description: t((t) => t.home.method.audit.description),
				outcome: t((t) => t.home.method.audit.outcome),
				icon: FileSearch,
			},
			{
				eyebrow: t((t) => t.home.method.migration.eyebrow),
				title: t((t) => t.home.method.migration.title),
				description: t((t) => t.home.method.migration.description),
				outcome: t((t) => t.home.method.migration.outcome),
				icon: Wrench,
			},
			{
				eyebrow: t((t) => t.home.method.release.eyebrow),
				title: t((t) => t.home.method.release.title),
				description: t((t) => t.home.method.release.description),
				outcome: t((t) => t.home.method.release.outcome),
				icon: Rocket,
			},
			{
				eyebrow: t((t) => t.home.method.handoff.eyebrow),
				title: t((t) => t.home.method.handoff.title),
				description: t((t) => t.home.method.handoff.description),
				outcome: t((t) => t.home.method.handoff.outcome),
				icon: GitBranch,
			},
		],
		migrationStart: {
			label: t((t) => t.home.method.start.label),
			title: t((t) => t.home.method.start.title),
			description: t((t) => t.home.method.start.description),
			icon: Smartphone,
		},
		migrationEnd: {
			label: t((t) => t.home.method.end.label),
			title: t((t) => t.home.method.end.title),
			description: t((t) => t.home.method.end.description),
			icon: Rocket,
		},
		migrationStatusLabels: {
			done: t((t) => t.home.method.status.done),
			current: t((t) => t.home.method.status.current),
			pending: t((t) => t.home.method.status.pending),
		},
	};
}
