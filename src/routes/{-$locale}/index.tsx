import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	CheckCircle2,
	Gauge,
	Rocket,
	ShieldCheck,
	Smartphone,
	Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { HeroIntroCard } from "@/components/blocks/HeroIntroCard";
import { Button } from "@/components/ui/button";
import {
	ANALYTICS_EVENTS,
	useAnalytics,
	useSectionViewTracking,
} from "@/lib/analytics";
import { HERO_PHOTO_ASSET_ID, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
	buildPersonStructuredData,
	buildProfessionalServiceStructuredData,
	buildSeo,
} from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/")({
	component: App,
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const heroPhotoUrl = await directus.getAssetUrl({
			data: HERO_PHOTO_ASSET_ID,
		});
		return { heroPhotoUrl, locale };
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
	title: string;
	description: string;
};

function App() {
	const { heroPhotoUrl } = Route.useLoaderData();
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

	const migrationPhases: MigrationPhase[] = [
		{
			title: t((t) => t.home.method.audit.title),
			description: t((t) => t.home.method.audit.description),
		},
		{
			title: t((t) => t.home.method.migration.title),
			description: t((t) => t.home.method.migration.description),
		},
		{
			title: t((t) => t.home.method.release.title),
			description: t((t) => t.home.method.release.description),
		},
		{
			title: t((t) => t.home.method.handoff.title),
			description: t((t) => t.home.method.handoff.description),
		},
	];

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
									<ArrowUpRight className="size-4" />
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
					<div className="space-y-6">
						<div className="terminal-card terminal-card-light p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="terminal-label">
										{t((t) => t.home.availability.label)}
									</p>
									<p className="terminal-heading-dark mt-2 text-2xl">
										{t((t) => t.home.availability.status)}
									</p>
								</div>
								<span className="terminal-chip">
									{t((t) => t.home.availability.badge)}
								</span>
							</div>
							<ul className="terminal-muted-dark mt-6 space-y-3 text-sm">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-secondary" />
									{t((t) => t.home.availability.items.item1)}
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-secondary" />
									{t((t) => t.home.availability.items.item2)}
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-secondary" />
									{t((t) => t.home.availability.items.item3)}
								</li>
							</ul>
						</div>
						<div className="terminal-card p-6">
							<div className="flex items-start justify-between">
								<div>
									<p className="terminal-label">
										{t((t) => t.home.signature.label)}
									</p>
									<p className="terminal-heading mt-2 text-2xl">
										{t((t) => t.home.signature.title)}
									</p>
								</div>
								<Sparkles className="size-6 text-accent" />
							</div>
							<p className="terminal-muted mt-4 text-sm">
								{t((t) => t.home.signature.description)}
							</p>
							<div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-secondary">
								<span>RN legacy</span>
								<span>|</span>
								<span>Expo/EAS</span>
								<span>|</span>
								<span>Store releases</span>
							</div>
						</div>
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
					<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						{riskCards.map((risk, index) => (
							<RiskCard key={risk.title} index={index} risk={risk} />
						))}
					</div>
					<Button variant="outline" asChild className="mt-8">
						<Link
							to="/{-$locale}/services/react-native-legacy-to-expo"
							params={localeParams}
							onClick={() =>
								capture(ANALYTICS_EVENTS.ctaClick, {
									cta: "migration_offer",
									placement: "home_risks",
									href: "/services/react-native-legacy-to-expo",
								})
							}
						>
							{t((t) => t.home.servicesSection.cta)}
							<ArrowUpRight className="size-4" />
						</Link>
					</Button>
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
					<TestimonialConsole testimonials={testimonials} />
				</div>
			</section>

			{/* biome-ignore lint/correctness/useUniqueElementIds: anchor targets */}
			<section
				id="process"
				className="terminal-section terminal-section-alt py-16 md:py-20"
			>
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
						<div>
							<h2 className="terminal-heading text-3xl md:text-4xl">
								{t((t) => t.home.method.title)}
							</h2>
							<p className="terminal-muted mt-4">
								{t((t) => t.home.method.description)}
							</p>
						</div>
						<div className="grid gap-4">
							{migrationPhases.map((phase, index) => (
								<div
									key={phase.title}
									className="terminal-card grid gap-4 p-5 sm:grid-cols-[auto_1fr]"
									style={{ animationDelay: `${index * 120}ms` }}
								>
									<span className="terminal-chip flex h-10 w-14 items-center justify-center p-0">
										{String(index + 1).padStart(2, "0")}
									</span>
									<div>
										<h3 className="terminal-heading text-lg">{phase.title}</h3>
										<p className="terminal-muted mt-2 text-sm">
											{phase.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
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

function TestimonialConsole({ testimonials }: { testimonials: Testimonial[] }) {
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
		<div className="testimonial-console terminal-card mt-10 overflow-hidden p-0 motion-safe:animate-fade-up">
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
