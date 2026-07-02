import { Link } from "@tanstack/react-router";
import { Gauge, Rocket, ShieldCheck, Smartphone } from "lucide-react";
import { HeroIntroCard } from "@/components/blocks/HeroIntroCard";
import { SiteIllustration } from "@/components/blocks/SiteIllustration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, type useAnalytics } from "@/lib/analytics";
import { SCHEDULE_VISIO_URL } from "@/lib/constants";
import { RiskCard } from "./HomeCards";
import { MigrationJourney } from "./MigrationJourney";
import { TestimonialConsole } from "./TestimonialConsole";
import type { HomeAssets, HomeContent } from "./types";

type AnalyticsCapture = ReturnType<typeof useAnalytics>["capture"];

type LocaleParams = Record<string, string>;

export function HomeHeroSection({
	assets,
	content,
	localeParams,
	capture,
	brandAlt,
}: {
	assets: Pick<HomeAssets, "heroPhotoUrl" | "heroIllustrationUrl">;
	content: HomeContent["hero"];
	localeParams: LocaleParams;
	capture: AnalyticsCapture;
	brandAlt: string;
}) {
	return (
		<section className="section-hero">
			<div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
				<div className="space-y-8">
					<h1 className="text-heading text-cursor motion-safe:animate-boot-line text-4xl md:text-6xl">
						{content.title}
					</h1>
					<HeroIntroCard
						heroPhotoUrl={assets.heroPhotoUrl}
						intro={content.intro}
						alt={brandAlt}
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
								{content.ctaPrimary}
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
								{content.ctaSecondary}
							</Link>
						</Button>
					</div>
					<div className="flex flex-wrap items-center gap-3 text-sm">
						<Badge>
							<Smartphone className="size-4" />
							<span>{content.highlights.expertise}</span>
						</Badge>
						<Badge variant="accent">
							<ShieldCheck className="size-4" />
							<span>{content.highlights.delivery}</span>
						</Badge>
						<Badge variant="foreground">
							<Gauge className="size-4" />
							<span>{content.highlights.performance}</span>
						</Badge>
					</div>
				</div>
				<div className="h-full">
					<SiteIllustration
						src={assets.heroIllustrationUrl}
						className="aspect-[3/2] md:aspect-[16/10] lg:h-full lg:min-h-[560px] lg:aspect-auto"
						priority
					/>
				</div>
			</div>
		</section>
	);
}

export function HomeServicesSection({
	content,
}: {
	content: Pick<HomeContent, "servicesSection" | "riskCards">;
}) {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: anchor targets
		<section
			id="services"
			className="section-divider section-muted py-16 md:py-20"
		>
			<div className="mx-auto w-full max-w-6xl px-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<h2 className="text-heading text-3xl md:text-4xl">
							{content.servicesSection.title}
						</h2>
					</div>
					<p className="text-body-muted max-w-xl">
						{content.servicesSection.description}
					</p>
				</div>
				<div className="mt-10 grid gap-6 md:grid-cols-2">
					{content.riskCards.map((risk, index) => (
						<RiskCard key={risk.title} index={index} risk={risk} />
					))}
				</div>
			</div>
		</section>
	);
}

export function HomeTestimonialsSection({
	assets,
	content,
}: {
	assets: Pick<HomeAssets, "proofIllustrationUrl">;
	content: Pick<HomeContent, "testimonialsSection" | "testimonials">;
}) {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: anchor targets
		<section id="testimonials" className="section-divider py-16 md:py-20">
			<div className="mx-auto w-full max-w-6xl px-6">
				<div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
					<div>
						<h2 className="text-heading text-3xl md:text-4xl">
							{content.testimonialsSection.title}
						</h2>
					</div>
					<p className="text-body-muted lg:max-w-2xl">
						{content.testimonialsSection.description}
					</p>
				</div>
				<div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
					<SiteIllustration
						src={assets.proofIllustrationUrl}
						className="aspect-[16/9] lg:aspect-auto"
					/>
					<TestimonialConsole
						testimonials={content.testimonials}
						className="mt-0"
					/>
				</div>
			</div>
		</section>
	);
}

export function HomeMethodSection({
	content,
}: {
	content: Pick<
		HomeContent,
		| "methodSection"
		| "migrationEnd"
		| "migrationPhases"
		| "migrationStart"
		| "migrationStatusLabels"
	>;
}) {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: anchor targets
		<section
			id="process"
			className="section-divider section-muted py-16 md:py-20"
		>
			<div className="mx-auto w-full max-w-6xl px-6">
				<div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
					<div>
						<h2 className="text-heading text-3xl md:text-4xl">
							{content.methodSection.title}
						</h2>
					</div>
					<p className="text-body-muted lg:max-w-2xl">
						{content.methodSection.description}
					</p>
				</div>
				<MigrationJourney
					end={content.migrationEnd}
					phases={content.migrationPhases}
					start={content.migrationStart}
					statusLabels={content.migrationStatusLabels}
				/>
			</div>
		</section>
	);
}

export function HomeFinalCta({
	content,
	capture,
}: {
	content: HomeContent["cta"];
	capture: AnalyticsCapture;
}) {
	return (
		<section className="section-divider section-muted py-16">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 className="text-heading text-3xl md:text-4xl">{content.title}</h2>
					<p className="text-body-muted mt-3">{content.description}</p>
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
						{content.button} <Rocket className="size-4" />
					</a>
				</Button>
			</div>
		</section>
	);
}
