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
import { useMemo } from "react";
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

type ProofCase = {
	name: string;
	category: string;
	context: string[];
	impact: string[];
	stack: string[];
	url?: string;
	proofType?: "client" | "field";
	testimonial?: Testimonial;
};

type Testimonial = {
	quote: string;
	name: string;
	role: string;
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
			{ id: "projects", label: "proofs" },
			{ id: "process", label: "process" },
		],
		[],
	);

	useSectionViewTracking(sectionTracking, { pageType: "home", locale });

	const proofCases: ProofCase[] = [
		{
			name: t((t) => t.home.projects.campingCarPark.name),
			category: t((t) => t.home.projects.campingCarPark.category),
			context: [t((t) => t.home.projects.campingCarPark.context.line1)],
			impact: [
				t((t) => t.home.projects.campingCarPark.impact.line1),
				t((t) => t.home.projects.campingCarPark.impact.line2),
				t((t) => t.home.projects.campingCarPark.impact.line3),
			],
			stack: [
				t((t) => t.home.projects.campingCarPark.stack.item1),
				t((t) => t.home.projects.campingCarPark.stack.item2),
				t((t) => t.home.projects.campingCarPark.stack.item3),
				t((t) => t.home.projects.campingCarPark.stack.item4),
			],
			url: "https://www.campingcarpark.com/fr_FR",
		},
		{
			name: t((t) => t.home.projects.linote.name),
			category: t((t) => t.home.projects.linote.category),
			context: [t((t) => t.home.projects.linote.context.line1)],
			impact: [
				t((t) => t.home.projects.linote.impact.line1),
				t((t) => t.home.projects.linote.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.linote.stack.item1),
				t((t) => t.home.projects.linote.stack.item2),
				t((t) => t.home.projects.linote.stack.item3),
				t((t) => t.home.projects.linote.stack.item4),
			],
			url: "https://linote.fr",
			testimonial: {
				quote: t((t) => t.home.projects.linote.testimonial.quote),
				name: t((t) => t.home.projects.linote.testimonial.name),
				role: t((t) => t.home.projects.linote.testimonial.role),
			},
		},
		{
			name: t((t) => t.home.projects.silbo.name),
			category: t((t) => t.home.projects.silbo.category),
			context: [t((t) => t.home.projects.silbo.context.line1)],
			impact: [
				t((t) => t.home.projects.silbo.impact.line1),
				t((t) => t.home.projects.silbo.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.silbo.stack.item1),
				t((t) => t.home.projects.silbo.stack.item2),
				t((t) => t.home.projects.silbo.stack.item3),
				t((t) => t.home.projects.silbo.stack.item4),
			],
			testimonial: {
				quote: t((t) => t.home.projects.silbo.testimonial.quote),
				name: t((t) => t.home.projects.silbo.testimonial.name),
				role: t((t) => t.home.projects.silbo.testimonial.role),
			},
		},
		{
			name: t((t) => t.home.projects.fieldExpo.name),
			category: t((t) => t.home.projects.fieldExpo.category),
			context: [
				t((t) => t.home.projects.fieldExpo.context.line1),
				t((t) => t.home.projects.fieldExpo.context.line2),
			],
			impact: [
				t((t) => t.home.projects.fieldExpo.impact.line1),
				t((t) => t.home.projects.fieldExpo.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.fieldExpo.stack.item1),
				t((t) => t.home.projects.fieldExpo.stack.item2),
				t((t) => t.home.projects.fieldExpo.stack.item3),
				t((t) => t.home.projects.fieldExpo.stack.item4),
			],
			url: "https://questovery.com/fr",
			proofType: "field",
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
									hash="projects"
									onClick={() =>
										capture(ANALYTICS_EVENTS.ctaClick, {
											cta: "proofs",
											placement: "home_hero",
											href: "#projects",
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
							<p className="terminal-label">
								{t((t) => t.home.servicesSection.label)}
							</p>
							<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
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
			<section id="projects" className="terminal-section py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="terminal-label">
								{t((t) => t.home.projectsSection.label)}
							</p>
							<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
								{t((t) => t.home.projectsSection.title)}
							</h2>
						</div>
						<p className="terminal-muted max-w-xl">
							{t((t) => t.home.projectsSection.description)}
						</p>
					</div>
					<div className="mt-10 grid gap-6 lg:grid-cols-2">
						{proofCases.map((proof, index) => (
							<ProofCard key={proof.name} index={index} proof={proof} />
						))}
					</div>
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
							<p className="terminal-label">{t((t) => t.home.method.label)}</p>
							<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
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
						<p className="terminal-label">{t((t) => t.home.cta.label)}</p>
						<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
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

function ProofCard({ proof, index }: { proof: ProofCase; index: number }) {
	const { t } = useI18n();
	const { capture } = useAnalytics();
	const isFieldProof = proof.proofType === "field";

	return (
		<div
			className={`terminal-card motion-safe:animate-fade-up p-6 ${
				isFieldProof ? "border-dashed border-accent/70" : ""
			}`}
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<p className="terminal-label mb-3">{proof.category}</p>
			<div className="flex items-center justify-between">
				<h3 className="terminal-heading pr-8 text-lg">
					{proof.url ? (
						<a
							href={proof.url}
							target="_blank"
							rel="noreferrer"
							className="underline-offset-4 transition hover:text-accent hover:underline"
							onClick={() =>
								capture(ANALYTICS_EVENTS.ctaClick, {
									cta: "proof_link",
									placement: "home_proofs",
									href: proof.url,
									project: proof.name,
								})
							}
						>
							{proof.name}
							<ArrowUpRight className="ml-1 inline-block size-3.5 align-baseline" />
						</a>
					) : (
						proof.name
					)}
				</h3>
			</div>
			<div className="mt-4 space-y-3">
				<p className="terminal-label">
					{t((t) => t.home.projectsSection.contextLabel)}
				</p>
				{proof.context.map((line) => (
					<p key={line} className="terminal-muted text-sm">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 space-y-3">
				<p className="terminal-label">
					{t((t) => t.home.projectsSection.impactLabel)}
				</p>
				{proof.impact.map((line) => (
					<p key={line} className="terminal-muted text-sm">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				{proof.stack.map((item) => (
					<span key={item} className="terminal-chip">
						{item}
					</span>
				))}
			</div>
			{proof.testimonial ? (
				<figure className="terminal-divider mt-6 border-t pt-4">
					<p className="terminal-label">
						{t((t) => t.home.projectsSection.testimonialLabel)}
					</p>
					<blockquote className="terminal-muted mt-3 text-sm">
						"{proof.testimonial.quote}"
					</blockquote>
					<figcaption className="mt-4">
						<p className="text-sm font-semibold text-foreground">
							{proof.testimonial.name}
						</p>
						<p className="terminal-label mt-1">{proof.testimonial.role}</p>
					</figcaption>
				</figure>
			) : null}
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
