import { createFileRoute, Link } from "@tanstack/react-router";
import {
	CheckCircle2,
	FileSearch,
	Gauge,
	GitBranch,
	type LucideIcon,
	Rocket,
	ShieldCheck,
	Smartphone,
	Wrench,
} from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { HeroIntroCard } from "@/components/blocks/HeroIntroCard";
import { SiteIllustration } from "@/components/blocks/SiteIllustration";
import { Button } from "@/components/ui/button";
import {
	ANALYTICS_EVENTS,
	useAnalytics,
	useSectionViewTracking,
} from "@/lib/analytics";
import {
	HERO_PHOTO_ASSET_ID,
	SCHEDULE_VISIO_URL,
	SITE_ILLUSTRATION_ASSET_IDS,
} from "@/lib/constants";
import { directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
	buildPersonStructuredData,
	buildProfessionalServiceStructuredData,
	buildSeo,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/{-$locale}/")({
	component: App,
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const [
			heroPhotoUrl,
			heroIllustrationUrl,
			risksIllustrationUrl,
			proofIllustrationUrl,
			legacyServiceIllustrationUrl,
			workflowServiceIllustrationUrl,
		] = await Promise.all([
			directus.getAssetUrl({
				data: HERO_PHOTO_ASSET_ID,
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.hero,
					width: 960,
					height: 640,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.risks,
					width: 800,
					height: 600,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.proof,
					width: 880,
					height: 520,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.legacyService,
					width: 760,
					height: 500,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.workflowService,
					width: 760,
					height: 500,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
		]);
		return {
			heroIllustrationUrl,
			heroPhotoUrl,
			legacyServiceIllustrationUrl,
			locale,
			proofIllustrationUrl,
			risksIllustrationUrl,
			workflowServiceIllustrationUrl,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.seo.homeTitle),
			description: t((t) => t.seo.homeDescription),
			path: "/",
			locale: loaderData.locale,
			structuredData: [
				buildPersonStructuredData(),
				buildProfessionalServiceStructuredData(loaderData.locale),
			],
		});
	},
});

type Testimonial = {
	quote: string;
	name: string;
};

type RiskCard = {
	title: string;
	description: string;
	bullet: string;
};

type MigrationPhase = {
	eyebrow: string;
	title: string;
	description: string;
	outcome: string;
	icon: LucideIcon;
};

type MigrationGate = {
	label: string;
	title: string;
	description: string;
	icon: LucideIcon;
};

type MigrationProgressStatus = "done" | "current" | "pending";

type MigrationStatusLabels = Record<MigrationProgressStatus, string>;

type MigrationProgressItem = {
	label: string;
	title: string;
	description: string;
	icon: LucideIcon;
	step?: string;
	outcome?: string;
};

type OfferTrack = {
	label: string;
	title: string;
	description: string;
	bullets: string[];
	illustrationUrl: string | null;
};

function App() {
	const {
		heroIllustrationUrl,
		heroPhotoUrl,
		legacyServiceIllustrationUrl,
		proofIllustrationUrl,
		risksIllustrationUrl,
		workflowServiceIllustrationUrl,
	} = Route.useLoaderData();
	const { t, locale, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const sectionTracking = useMemo(
		() => [
			{ id: "services", label: "risks" },
			{ id: "testimonials", label: "testimonials" },
			{ id: "process", label: "process" },
		],
		[],
	);

	useSectionViewTracking(sectionTracking, { pageType: "home", locale });

	const testimonials: Testimonial[] = [
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
	];

	const riskCards: RiskCard[] = [
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
	];

	const offerTracks: OfferTrack[] = [
		{
			label: t((t) => t.home.offerTracks.migration.label),
			title: t((t) => t.home.offerTracks.migration.title),
			description: t((t) => t.home.offerTracks.migration.description),
			bullets: [
				t((t) => t.home.offerTracks.migration.bullets.item1),
				t((t) => t.home.offerTracks.migration.bullets.item2),
				t((t) => t.home.offerTracks.migration.bullets.item3),
			],
			illustrationUrl: legacyServiceIllustrationUrl,
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
			illustrationUrl: workflowServiceIllustrationUrl,
		},
	];

	const migrationPhases: MigrationPhase[] = [
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
	];

	const migrationStart: MigrationGate = {
		label: t((t) => t.home.method.start.label),
		title: t((t) => t.home.method.start.title),
		description: t((t) => t.home.method.start.description),
		icon: Smartphone,
	};

	const migrationEnd: MigrationGate = {
		label: t((t) => t.home.method.end.label),
		title: t((t) => t.home.method.end.title),
		description: t((t) => t.home.method.end.description),
		icon: Rocket,
	};

	const migrationStatusLabels: MigrationStatusLabels = {
		done: t((t) => t.home.method.status.done),
		current: t((t) => t.home.method.status.current),
		pending: t((t) => t.home.method.status.pending),
	};

	return (
		<div className="terminal-page">
			<section className="terminal-hero">
				<div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="space-y-8">
						<p className="terminal-label terminal-boot-line">
							{t((t) => t.home.hero.eyebrow)}
						</p>
						<h1 className="terminal-heading terminal-boot-line terminal-cursor text-4xl md:text-6xl">
							{t((t) => t.home.hero.title)}
						</h1>
						<HeroIntroCard
							heroPhotoUrl={heroPhotoUrl}
							intro={t((t) => t.home.hero.intro)}
							alt={t((t) => t.nav.brand)}
						/>
						<div className="flex flex-wrap items-center gap-4">
							<Button asChild>
								<a
									href={SCHEDULE_VISIO_URL}
									target="_blank"
									rel="noreferrer"
									onClick={() =>
										capture(ANALYTICS_EVENTS.ctaClick, {
											cta: "schedule_call",
											placement: "home_hero",
											href: SCHEDULE_VISIO_URL,
										})
									}
								>
									{t((t) => t.home.hero.ctaPrimary)}
									<Rocket className="size-4" />
								</a>
							</Button>
							<Button variant="outline" asChild>
								<Link
									to="/{-$locale}"
									params={localeParams}
									hash="testimonials"
									onClick={() =>
										capture(ANALYTICS_EVENTS.ctaClick, {
											cta: "testimonials",
											placement: "home_hero",
											href: "#testimonials",
										})
									}
								>
									{t((t) => t.home.hero.ctaSecondary)}
								</Link>
							</Button>
						</div>
						<div className="flex flex-wrap items-center gap-3 text-sm">
							<div className="terminal-chip">
								<Smartphone className="size-4" />
								<span>{t((t) => t.home.hero.highlights.expertise)}</span>
							</div>
							<div className="terminal-chip text-accent">
								<ShieldCheck className="size-4" />
								<span>{t((t) => t.home.hero.highlights.delivery)}</span>
							</div>
							<div className="terminal-chip text-foreground">
								<Gauge className="size-4" />
								<span>{t((t) => t.home.hero.highlights.performance)}</span>
							</div>
						</div>
					</div>
					<div className="h-full">
						<SiteIllustration
							src={heroIllustrationUrl}
							className="aspect-[3/2] md:aspect-[16/10] lg:h-full lg:min-h-[560px] lg:aspect-auto"
							priority
						/>
					</div>
				</div>
			</section>

			{/* biome-ignore lint/correctness/useUniqueElementIds: anchor targets */}
			<section
				id="services"
				className="terminal-section terminal-section-alt py-16 md:py-20"
			>
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<h2 className="terminal-heading text-3xl md:text-4xl">
								{t((t) => t.home.servicesSection.title)}
							</h2>
						</div>
						<p className="terminal-muted max-w-xl">
							{t((t) => t.home.servicesSection.description)}
						</p>
					</div>
					<div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
						<SiteIllustration
							src={risksIllustrationUrl}
							className="aspect-[4/3] lg:aspect-auto"
						/>
						<div className="grid gap-6 md:grid-cols-2">
							{riskCards.map((risk, index) => (
								<RiskCard key={risk.title} index={index} risk={risk} />
							))}
						</div>
					</div>
					<div className="mt-10 grid gap-6 lg:grid-cols-2">
						{offerTracks.map((track, index) => (
							<OfferTrackCard key={track.title} track={track} index={index} />
						))}
					</div>
				</div>
			</section>

			{/* biome-ignore lint/correctness/useUniqueElementIds: anchor targets */}
			<section id="testimonials" className="terminal-section py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
						<div>
							<h2 className="terminal-heading text-3xl md:text-4xl">
								{t((t) => t.home.testimonialsSection.title)}
							</h2>
						</div>
						<p className="terminal-muted lg:max-w-2xl">
							{t((t) => t.home.testimonialsSection.description)}
						</p>
					</div>
					<div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
						<SiteIllustration
							src={proofIllustrationUrl}
							className="aspect-[16/9] lg:aspect-auto"
						/>
						<TestimonialConsole testimonials={testimonials} className="mt-0" />
					</div>
				</div>
			</section>

			{/* biome-ignore lint/correctness/useUniqueElementIds: anchor targets */}
			<section
				id="process"
				className="terminal-section terminal-section-alt py-16 md:py-20"
			>
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
						<div>
							<p className="terminal-label">{t((t) => t.home.method.label)}</p>
							<h2 className="terminal-heading text-3xl md:text-4xl">
								{t((t) => t.home.method.title)}
							</h2>
						</div>
						<p className="terminal-muted lg:max-w-2xl">
							{t((t) => t.home.method.description)}
						</p>
					</div>
					<MigrationJourney
						end={migrationEnd}
						phases={migrationPhases}
						start={migrationStart}
						statusLabels={migrationStatusLabels}
					/>
				</div>
			</section>

			<section className="terminal-section terminal-section-alt py-16">
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
					<div>
						<h2 className="terminal-heading text-3xl md:text-4xl">
							{t((t) => t.home.cta.title)}
						</h2>
						<p className="terminal-muted mt-3">
							{t((t) => t.home.cta.description)}
						</p>
					</div>
					<Button asChild size="lg">
						<a
							href={SCHEDULE_VISIO_URL}
							target="_blank"
							rel="noreferrer"
							onClick={() =>
								capture(ANALYTICS_EVENTS.ctaClick, {
									cta: "schedule_call",
									placement: "home_cta",
									href: SCHEDULE_VISIO_URL,
								})
							}
						>
							{t((t) => t.home.cta.button)} <Rocket className="size-4" />
						</a>
					</Button>
				</div>
			</section>
		</div>
	);
}

function TestimonialConsole({
	testimonials,
	className,
}: {
	testimonials: Testimonial[];
	className?: string;
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [visibleWords, setVisibleWords] = useState(1);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const activeTestimonial = testimonials[activeIndex] ??
		testimonials[0] ?? {
			name: "",
			quote: "",
		};
	const activeWords = activeTestimonial.quote.split(" ");
	const visibleQuote = prefersReducedMotion
		? activeTestimonial.quote
		: activeWords.slice(0, visibleWords).join(" ");

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateMotionPreference = () =>
			setPrefersReducedMotion(mediaQuery.matches);

		updateMotionPreference();
		mediaQuery.addEventListener("change", updateMotionPreference);

		return () =>
			mediaQuery.removeEventListener("change", updateMotionPreference);
	}, []);

	useEffect(() => {
		if (prefersReducedMotion || testimonials.length <= 1) {
			setVisibleWords(activeWords.length);
			return;
		}

		const hasWrittenQuote = visibleWords >= activeWords.length;
		const hasClearedQuote = visibleWords === 0;
		const delay = hasWrittenQuote ? 2400 : hasClearedQuote ? 420 : 90;
		const timeout = window.setTimeout(() => {
			if (hasWrittenQuote) {
				setVisibleWords(0);
				return;
			}

			if (hasClearedQuote) {
				setActiveIndex((index) => (index + 1) % testimonials.length);
				setVisibleWords(1);
				return;
			}

			setVisibleWords((count) =>
				Math.max(1, Math.min(activeWords.length, count + 1)),
			);
		}, delay);

		return () => window.clearTimeout(timeout);
	}, [
		activeWords.length,
		prefersReducedMotion,
		testimonials.length,
		visibleWords,
	]);

	return (
		<div
			className={cn(
				"testimonial-console terminal-card mt-10 overflow-hidden p-0 motion-safe:animate-fade-up",
				className,
			)}
		>
			<div className="testimonial-console-bar">
				<span>feedback.recv</span>
				<span>
					{String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(testimonials.length).padStart(2, "0")}
				</span>
			</div>
			<div className="testimonial-console-body p-6 md:p-8 lg:p-10">
				<figure
					className="testimonial-console-screen"
					aria-label={`${activeTestimonial.name}: ${activeTestimonial.quote}`}
				>
					<figcaption className="testimonial-console-name">
						{activeTestimonial.name}
					</figcaption>
					<blockquote className="testimonial-console-quote">
						<span>{visibleQuote}</span>
						{prefersReducedMotion ? null : (
							<span className="testimonial-console-caret" aria-hidden="true" />
						)}
					</blockquote>
				</figure>
			</div>
		</div>
	);
}

function MigrationJourney({
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
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const lastItemIndex = journeyItems.length - 1;
	const completeIndex = journeyItems.length;
	const progressRatio = prefersReducedMotion
		? 1
		: Math.min(activeIndex, lastItemIndex) / Math.max(1, lastItemIndex);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateMotionPreference = () =>
			setPrefersReducedMotion(mediaQuery.matches);

		updateMotionPreference();
		mediaQuery.addEventListener("change", updateMotionPreference);

		return () =>
			mediaQuery.removeEventListener("change", updateMotionPreference);
	}, []);

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
								"migration-progress-card terminal-card p-5 motion-safe:animate-fade-up",
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
									<span className="terminal-chip flex h-9 w-12 items-center justify-center p-0">
										{item.step}
									</span>
								) : null}
								<p className="terminal-label">{item.label}</p>
							</div>
							<h3 className="terminal-heading mt-3 text-xl">{item.title}</h3>
							<p className="terminal-muted mt-3 text-sm">{item.description}</p>
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

function RiskCard({ risk, index }: { risk: RiskCard; index: number }) {
	return (
		<div
			className="terminal-card p-6 motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="terminal-heading pr-8 text-lg">{risk.title}</h3>
				<ShieldCheck className="size-5 text-secondary" />
			</div>
			<p className="terminal-muted mt-3 text-sm">{risk.description}</p>
			<p className="terminal-muted mt-5 flex items-start gap-2 text-sm">
				<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
				{risk.bullet}
			</p>
		</div>
	);
}

function OfferTrackCard({
	track,
	index,
}: {
	track: OfferTrack;
	index: number;
}) {
	return (
		<article
			className="terminal-card grid overflow-hidden p-3 motion-safe:animate-fade-up md:grid-cols-[0.8fr_1fr] lg:grid-cols-1"
			style={{ animationDelay: `${(index + 4) * 120}ms` }}
		>
			<SiteIllustration
				src={track.illustrationUrl}
				className="box-border aspect-[3/2] min-w-0 max-w-full self-stretch justify-self-stretch"
			/>
			<div className="flex flex-col p-3 pt-5 md:p-5 lg:p-3 lg:pt-5">
				<p className="terminal-label">{track.label}</p>
				<h3 className="terminal-heading mt-3 text-xl">{track.title}</h3>
				<p className="terminal-muted mt-3 text-sm">{track.description}</p>
				<ul className="mt-5 grid gap-3 text-sm">
					{track.bullets.map((bullet) => (
						<li key={bullet} className="terminal-muted flex items-start gap-2">
							<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
							<span>{bullet}</span>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}
