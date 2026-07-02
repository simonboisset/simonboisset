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
		| "legacyServiceIllustrationUrl"
		| "risksIllustrationUrl"
		| "workflowServiceIllustrationUrl"
	>,
): HomeContent {
	return {
		hero: {
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
				illustrationUrl: assets.legacyServiceIllustrationUrl,
			},
			{
				title: t((t) => t.home.risks.delivery.title),
				description: t((t) => t.home.risks.delivery.description),
				bullet: t((t) => t.home.risks.delivery.bullet),
				illustrationUrl: assets.workflowServiceIllustrationUrl,
			},
			{
				title: t((t) => t.home.risks.stores.title),
				description: t((t) => t.home.risks.stores.description),
				bullet: t((t) => t.home.risks.stores.bullet),
				illustrationUrl: assets.risksIllustrationUrl,
			},
			{
				title: t((t) => t.home.risks.handoff.title),
				description: t((t) => t.home.risks.handoff.description),
				bullet: t((t) => t.home.risks.handoff.bullet),
				illustrationUrl: null,
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
