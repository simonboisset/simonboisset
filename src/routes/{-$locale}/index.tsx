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

type Project = {
	name: string;
	product: string[];
	impact: string[];
	stack: string[];
	url: string;
};

type Testimonial = {
	quote: string;
	name: string;
	role: string;
};

type FocusCard = {
	title: string;
	description: string;
	bullets: string[];
	cta: string;
	to?: string;
	href?: string;
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
			{ id: "services", label: "focus" },
			{ id: "projects", label: "projects" },
			{ id: "process", label: "process" },
			{ id: "testimonials", label: "testimonials" },
		],
		[],
	);

	useSectionViewTracking(sectionTracking, { pageType: "home", locale });

	const projects: Project[] = [
		{
			name: t((t) => t.home.projects.campingCarPark.name),
			product: [t((t) => t.home.projects.campingCarPark.product.line1)],
			impact: [
				t((t) => t.home.projects.campingCarPark.impact.line1),
				t((t) => t.home.projects.campingCarPark.impact.line2),
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
			product: [t((t) => t.home.projects.linote.product.line1)],
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
		},
		{
			name: t((t) => t.home.projects.monPontChanban.name),
			product: [t((t) => t.home.projects.monPontChanban.product.line1)],
			impact: [
				t((t) => t.home.projects.monPontChanban.impact.line1),
				t((t) => t.home.projects.monPontChanban.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.monPontChanban.stack.item1),
				t((t) => t.home.projects.monPontChanban.stack.item2),
				t((t) => t.home.projects.monPontChanban.stack.item3),
				t((t) => t.home.projects.monPontChanban.stack.item4),
			],
			url: "https://www.pont-chaban-delmas.com/",
		},
		{
			name: t((t) => t.home.projects.questovery.name),
			product: [t((t) => t.home.projects.questovery.product.line1)],
			impact: [
				t((t) => t.home.projects.questovery.impact.line1),
				t((t) => t.home.projects.questovery.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.questovery.stack.item1),
				t((t) => t.home.projects.questovery.stack.item2),
				t((t) => t.home.projects.questovery.stack.item3),
				t((t) => t.home.projects.questovery.stack.item4),
			],
			url: "https://questovery.com/fr",
		},
	];

	const testimonials: Testimonial[] = [
		{
			quote: t((t) => t.home.testimonials.eric.quote),
			name: t((t) => t.home.testimonials.eric.name),
			role: t((t) => t.home.testimonials.eric.role),
		},
		{
			quote: t((t) => t.home.testimonials.anthony.quote),
			name: t((t) => t.home.testimonials.anthony.name),
			role: t((t) => t.home.testimonials.anthony.role),
		},
		{
			quote: t((t) => t.home.testimonials.thomas.quote),
			name: t((t) => t.home.testimonials.thomas.name),
			role: t((t) => t.home.testimonials.thomas.role),
		},
	];

	const focusCards: FocusCard[] = [
		{
			title: t((t) => t.home.focus.migration.title),
			description: t((t) => t.home.focus.migration.description),
			to: "/{-$locale}/services/react-native-legacy-to-expo",
			cta: t((t) => t.home.focus.migration.cta),
			bullets: [
				t((t) => t.home.focus.migration.bullets.item1),
				t((t) => t.home.focus.migration.bullets.item2),
				t((t) => t.home.focus.migration.bullets.item3),
			],
		},
		{
			title: t((t) => t.home.focus.questovery.title),
			description: t((t) => t.home.focus.questovery.description),
			href: "https://questovery.com/fr",
			cta: t((t) => t.home.focus.questovery.cta),
			bullets: [
				t((t) => t.home.focus.questovery.bullets.item1),
				t((t) => t.home.focus.questovery.bullets.item2),
				t((t) => t.home.focus.questovery.bullets.item3),
			],
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
								<a
									href="https://questovery.com/fr"
									target="_blank"
									rel="noreferrer"
									onClick={() =>
										capture(ANALYTICS_EVENTS.ctaClick, {
											cta: "questovery",
											placement: "home_hero",
											href: "https://questovery.com/fr",
										})
									}
								>
									{t((t) => t.home.hero.ctaSecondary)}
								</a>
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
								<span>Questovery</span>
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
					<div className="mt-10 grid gap-6 lg:grid-cols-2">
						{focusCards.map((focus, index) => (
							<FocusCard
								key={focus.title}
								focus={focus}
								index={index}
								localeParams={localeParams}
							/>
						))}
					</div>
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
						{projects.map((project, index) => (
							<ProjectCard key={project.name} index={index} project={project} />
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

			{/* biome-ignore lint/correctness/useUniqueElementIds: anchor targets */}
			<section id="testimonials" className="terminal-section py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="terminal-label">
								{t((t) => t.home.testimonialsSection.label)}
							</p>
							<h2 className="terminal-heading mt-3 text-3xl md:text-4xl">
								{t((t) => t.home.testimonialsSection.title)}
							</h2>
						</div>
						<p className="terminal-muted max-w-xl">
							{t((t) => t.home.testimonialsSection.description)}
						</p>
					</div>
					<div className="mt-10 grid gap-6 lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<TestimonialCard
								key={testimonial.name}
								index={index}
								testimonial={testimonial}
							/>
						))}
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
	const { t } = useI18n();
	const { capture } = useAnalytics();

	return (
		<div
			className="terminal-card motion-safe:animate-fade-up p-6"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="terminal-heading pr-8 text-lg">
					<a
						href={project.url}
						target="_blank"
						rel="noreferrer"
						className="underline-offset-4 transition hover:text-accent hover:underline"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "project_link",
								placement: "home_projects",
								href: project.url,
								project: project.name,
							})
						}
					>
						{project.name}
						<ArrowUpRight className="ml-1 inline-block size-3.5 align-baseline" />
					</a>
				</h3>
			</div>
			<div className="mt-4 space-y-3">
				<p className="terminal-label">
					{t((t) => t.home.projectsSection.productLabel)}
				</p>
				{project.product.map((line) => (
					<p key={line} className="terminal-muted text-sm">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 space-y-3">
				<p className="terminal-label">
					{t((t) => t.home.projectsSection.impactLabel)}
				</p>
				{project.impact.map((line) => (
					<p key={line} className="terminal-muted text-sm">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				{project.stack.map((item) => (
					<span key={item} className="terminal-chip">
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

function FocusCard({
	focus,
	index,
	localeParams,
}: {
	focus: FocusCard;
	index: number;
	localeParams: Record<string, string>;
}) {
	const { capture } = useAnalytics();
	const cardClassName =
		index === 0
			? "terminal-card terminal-card-light p-6 motion-safe:animate-fade-up"
			: "terminal-card p-6 motion-safe:animate-fade-up";
	const mutedTextClassName =
		index === 0 ? "terminal-muted-dark" : "terminal-muted";
	const titleClassName =
		index === 0 ? "terminal-heading-dark" : "terminal-heading";

	const content = (
		<div
			className={cardClassName}
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className={`pr-8 text-xl ${titleClassName}`}>{focus.title}</h3>
				{index === 0 ? (
					<Smartphone className="size-5 text-secondary" />
				) : (
					<Sparkles className="size-5 text-accent" />
				)}
			</div>
			<p className={`mt-3 text-sm ${mutedTextClassName}`}>
				{focus.description}
			</p>
			<ul className={`mt-5 space-y-2 text-sm ${mutedTextClassName}`}>
				{focus.bullets.map((bullet) => (
					<li key={bullet} className="flex items-center gap-2">
						<CheckCircle2 className="size-4 text-secondary" />
						{bullet}
					</li>
				))}
			</ul>
			<Button
				variant={index === 0 ? "outline" : "secondary"}
				size="sm"
				asChild
				className="mt-6"
			>
				{focus.to ? (
					<Link
						to={focus.to}
						params={localeParams}
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "focus_detail",
								placement: "home_focus",
								href: focus.to,
								service: focus.title,
							})
						}
					>
						{focus.cta} <ArrowUpRight className="size-4" />
					</Link>
				) : (
					<a
						href={focus.href}
						target="_blank"
						rel="noreferrer"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "questovery",
								placement: "home_focus",
								href: focus.href,
							})
						}
					>
						{focus.cta} <ArrowUpRight className="size-4" />
					</a>
				)}
			</Button>
		</div>
	);

	return focus.to ? (
		content
	) : (
		<div className="contents" data-focus-href={focus.href}>
			{content}
		</div>
	);
}

function TestimonialCard({
	testimonial,
	index,
}: {
	testimonial: Testimonial;
	index: number;
}) {
	return (
		<div
			className="terminal-card flex h-full flex-col p-6 motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<p className="terminal-muted text-left text-sm">"{testimonial.quote}"</p>
			<div className="mt-auto pt-6">
				<div className="terminal-divider border-t pt-4">
					<p className="text-sm font-semibold text-foreground">
						{testimonial.name}
					</p>
					<p className="terminal-label mt-1">{testimonial.role}</p>
				</div>
			</div>
		</div>
	);
}
