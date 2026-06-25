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
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/70 blur-3xl animate-float" />
				<div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-teal-200/70 blur-3xl animate-float" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),rgba(246,241,234,0.9)_55%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="space-y-8">
						<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
							{t((t) => t.home.hero.eyebrow)}
						</p>
						<h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
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
						<div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
							<div className="flex items-center gap-2">
								<Smartphone className="size-4 text-teal-700" />
								<span>{t((t) => t.home.hero.highlights.expertise)}</span>
							</div>
							<div className="flex items-center gap-2">
								<ShieldCheck className="size-4 text-amber-700" />
								<span>{t((t) => t.home.hero.highlights.delivery)}</span>
							</div>
							<div className="flex items-center gap-2">
								<Gauge className="size-4 text-slate-700" />
								<span>{t((t) => t.home.hero.highlights.performance)}</span>
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm uppercase tracking-[0.2em] text-slate-500">
										{t((t) => t.home.availability.label)}
									</p>
									<p className="text-2xl font-semibold text-slate-900">
										{t((t) => t.home.availability.status)}
									</p>
								</div>
								<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
									{t((t) => t.home.availability.badge)}
								</span>
							</div>
							<ul className="mt-6 space-y-3 text-sm text-slate-600">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									{t((t) => t.home.availability.items.item1)}
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									{t((t) => t.home.availability.items.item2)}
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									{t((t) => t.home.availability.items.item3)}
								</li>
							</ul>
						</div>
						<div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
										{t((t) => t.home.signature.label)}
									</p>
									<p className="mt-2 text-2xl font-semibold">
										{t((t) => t.home.signature.title)}
									</p>
								</div>
								<Sparkles className="size-6 text-amber-300" />
							</div>
							<p className="mt-4 text-sm text-slate-300">
								{t((t) => t.home.signature.description)}
							</p>
							<div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
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
			<section id="services" className="bg-[#f3ede4] py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								{t((t) => t.home.servicesSection.label)}
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								{t((t) => t.home.servicesSection.title)}
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
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
			<section id="projects" className="py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								{t((t) => t.home.projectsSection.label)}
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								{t((t) => t.home.projectsSection.title)}
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
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
			<section id="process" className="bg-white py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								{t((t) => t.home.method.label)}
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								{t((t) => t.home.method.title)}
							</h2>
							<p className="mt-4 text-slate-600">
								{t((t) => t.home.method.description)}
							</p>
						</div>
						<div className="grid gap-4">
							{migrationPhases.map((phase, index) => (
								<div
									key={phase.title}
									className="grid gap-4 rounded-2xl border border-slate-200 bg-[#f6f1ea] p-5 shadow-sm sm:grid-cols-[auto_1fr]"
								>
									<span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
										{index + 1}
									</span>
									<div>
										<h3 className="text-lg font-semibold text-slate-900">
											{phase.title}
										</h3>
										<p className="mt-2 text-sm text-slate-600">
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
			<section id="testimonials" className="py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								{t((t) => t.home.testimonialsSection.label)}
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								{t((t) => t.home.testimonialsSection.title)}
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
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

			<section className="bg-[#101827] py-16 text-white">
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">
							{t((t) => t.home.cta.label)}
						</p>
						<h2 className="mt-3 text-3xl font-semibold md:text-4xl">
							{t((t) => t.home.cta.title)}
						</h2>
						<p className="mt-3 text-slate-300">
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
			className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-slate-900">
					<a
						href={project.url}
						target="_blank"
						rel="noreferrer"
						className="underline-offset-4 transition hover:text-amber-600 hover:underline"
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
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
					{t((t) => t.home.projectsSection.productLabel)}
				</p>
				{project.product.map((line) => (
					<p key={line} className="text-sm text-slate-600">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 space-y-3">
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
					{t((t) => t.home.projectsSection.impactLabel)}
				</p>
				{project.impact.map((line) => (
					<p key={line} className="text-sm text-slate-600">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
				{project.stack.map((item) => (
					<span
						key={item}
						className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
					>
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
			? "rounded-3xl border border-slate-200 bg-white p-6 shadow-lg motion-safe:animate-fade-up"
			: "rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg motion-safe:animate-fade-up";
	const mutedTextClassName = index === 0 ? "text-slate-600" : "text-slate-300";
	const titleClassName = index === 0 ? "text-slate-900" : "text-white";

	const content = (
		<div
			className={cardClassName}
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className={`text-xl font-semibold ${titleClassName}`}>
					{focus.title}
				</h3>
				{index === 0 ? (
					<Smartphone className="size-5 text-teal-600" />
				) : (
					<Sparkles className="size-5 text-amber-300" />
				)}
			</div>
			<p className={`mt-3 text-sm ${mutedTextClassName}`}>
				{focus.description}
			</p>
			<ul className={`mt-5 space-y-2 text-sm ${mutedTextClassName}`}>
				{focus.bullets.map((bullet) => (
					<li key={bullet} className="flex items-center gap-2">
						<CheckCircle2 className="size-4 text-emerald-600" />
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
			className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<p className="text-justify text-sm italic text-slate-600">
				"{testimonial.quote}"
			</p>
			<div className="mt-auto pt-6">
				<div className="border-t border-slate-100 pt-4">
					<p className="text-sm font-semibold text-slate-900">
						{testimonial.name}
					</p>
					<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
						{testimonial.role}
					</p>
				</div>
			</div>
		</div>
	);
}
