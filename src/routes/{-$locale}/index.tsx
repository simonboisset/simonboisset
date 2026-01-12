import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	CheckCircle2,
	Gauge,
	Github,
	Rocket,
	ShieldCheck,
	Smartphone,
	Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { directus } from "@/lib/directus";
import { useI18n } from "@/lib/i18n/use-i18n";

const HERO_PHOTO_ASSET_ID = "d891253f-cd33-486e-bff4-393d96d57f49";

export const Route = createFileRoute("/{-$locale}/")({
	component: App,
	loader: () => directus.getAssetUrl({ data: HERO_PHOTO_ASSET_ID }),
});

type Project = {
	name: string;
	product: string[];
	impact: string[];
	stack: string[];
};

type Testimonial = {
	quote: string;
	name: string;
	role: string;
};

type ProductizedService = {
	title: string;
	description: string;
	to: string;
	bullets: string[];
};

type ServiceLine = {
	title: string;
	description: string;
};

function App() {
	const heroPhotoUrl = Route.useLoaderData();
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

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
		},
		{
			name: t((t) => t.home.projects.vaerdict.name),
			product: [t((t) => t.home.projects.vaerdict.product.line1)],
			impact: [
				t((t) => t.home.projects.vaerdict.impact.line1),
				t((t) => t.home.projects.vaerdict.impact.line2),
			],
			stack: [
				t((t) => t.home.projects.vaerdict.stack.item1),
				t((t) => t.home.projects.vaerdict.stack.item2),
				t((t) => t.home.projects.vaerdict.stack.item3),
				t((t) => t.home.projects.vaerdict.stack.item4),
			],
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
		},
		{
			name: t((t) => t.home.projects.silbo.name),
			product: [t((t) => t.home.projects.silbo.product.line1)],
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
		},
	]

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
	]

	const serviceLines: ServiceLine[] = [
		{
			title: t((t) => t.home.serviceLines.mobile.title),
			description: t((t) => t.home.serviceLines.mobile.description),
		},
		{
			title: t((t) => t.home.serviceLines.fullstack.title),
			description: t((t) => t.home.serviceLines.fullstack.description),
		},
		{
			title: t((t) => t.home.serviceLines.design.title),
			description: t((t) => t.home.serviceLines.design.description),
		},
	]

	const productizedServices: ProductizedService[] = [
		{
			title: t((t) => t.home.productized.legacy.title),
			description: t((t) => t.home.productized.legacy.description),
			to: "/{-$locale}/services/react-native-legacy-to-expo",
			bullets: [
				t((t) => t.home.productized.legacy.bullets.item1),
				t((t) => t.home.productized.legacy.bullets.item2),
				t((t) => t.home.productized.legacy.bullets.item3),
			],
		},
		{
			title: t((t) => t.home.productized.workflow.title),
			description: t((t) => t.home.productized.workflow.description),
			to: "/{-$locale}/services/expo-workflow-optimization",
			bullets: [
				t((t) => t.home.productized.workflow.bullets.item1),
				t((t) => t.home.productized.workflow.bullets.item2),
				t((t) => t.home.productized.workflow.bullets.item3),
			],
		},
	]

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
						{heroPhotoUrl ? (
							<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
								<div className="rounded-full border border-slate-200 bg-white/90 p-2 shadow-lg">
									<div className="size-20 overflow-hidden rounded-full bg-slate-100 md:size-24">
										<img
											src={heroPhotoUrl}
											alt={t((t) => t.nav.brand)}
											className="h-full w-full object-cover"
										/>
									</div>
								</div>
								<p className="rounded-[22px] rounded-tl-[8px] rounded-br-[30px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,248,240,0.92),rgba(236,248,246,0.9))] px-4 py-3 text-sm italic text-slate-600 shadow-sm md:text-base">
									{t((t) => t.home.hero.intro)}
								</p>
							</div>
						) : (
							<p className="text-lg text-slate-600 md:text-xl">
								{t((t) => t.home.hero.intro)}
							</p>
						)}
						<div className="flex flex-wrap items-center gap-4">
							<Button asChild>
								<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
									{t((t) => t.home.hero.ctaPrimary)}
									<ArrowUpRight className="size-4" />
								</a>
							</Button>
							<Button variant="outline" asChild>
								<Link
									to="/{-$locale}"
									hash="services"
									params={localeParams}
								>
									{t((t) => t.home.hero.ctaSecondary)}
								</Link>
							</Button>
							<Button
								asChild
								className="border border-[#0d1117] bg-[#0d1117] text-white hover:bg-[#161b22] hover:text-white"
							>
								<a href={GITHUB_URL} target="_blank" rel="noreferrer">
									{t((t) => t.home.hero.ctaGithub)} <Github className="size-4" />
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
								<span>React Native</span>
								<span>|</span>
								<span>Expo</span>
								<span>|</span>
								<span>TypeScript</span>
							</div>
						</div>
					</div>
				</div>
			</section>

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
					<div className="mt-10 grid gap-6 lg:grid-cols-3">
						{projects.map((project, index) => (
							<ProjectCard
								key={project.name}
								index={index}
								project={project}
							/>
						))}
					</div>
				</div>
			</section>

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
					<div className="mt-10 grid gap-6 md:grid-cols-3">
						{serviceLines.map((service) => (
							<div
								key={service.title}
								className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
							>
								<h3 className="text-lg font-semibold text-slate-900">
									{service.title}
								</h3>
								<p className="mt-3 text-sm text-slate-600">
									{service.description}
								</p>
							</div>
						))}
					</div>

					<div className="mt-12 grid gap-6 lg:grid-cols-2">
						{productizedServices.map((service, index) => (
							<ProductServiceCard
								key={service.title}
								index={index}
								service={service}
								localeParams={localeParams}
								buttonLabel={t((t) => t.home.productized.button)}
							/>
						))}
					</div>
				</div>
			</section>

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
						<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
							{t((t) => t.home.cta.button)} <Rocket className="size-4" />
						</a>
					</Button>
				</div>
			</section>
		</div>
	);
}

function ProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}) {
	const { t } = useI18n();

	return (
		<div
			className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
				<Sparkles className="size-4 text-amber-600" />
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

function ProductServiceCard({
	service,
	index,
	localeParams,
	buttonLabel,
}: {
	service: ProductizedService;
	index: number;
	localeParams: Record<string, string>;
	buttonLabel: string;
}) {
	return (
		<div
			className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
				<Gauge className="size-5 text-teal-600" />
			</div>
			<p className="mt-3 text-sm text-slate-600">{service.description}</p>
			<ul className="mt-4 space-y-2 text-sm text-slate-600">
				{service.bullets.map((bullet) => (
					<li key={bullet} className="flex items-center gap-2">
						<CheckCircle2 className="size-4 text-emerald-600" />
						{bullet}
					</li>
				))}
			</ul>
			<Button variant="outline" size="sm" asChild className="mt-6">
				<Link to={service.to} params={localeParams}>
					{buttonLabel} <ArrowUpRight className="size-4" />
				</Link>
			</Button>
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
