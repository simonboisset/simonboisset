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

const HERO_PHOTO_ASSET_ID = "d891253f-cd33-486e-bff4-393d96d57f49";

export const Route = createFileRoute("/")({
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
	href:
		| "/services/react-native-legacy-to-expo"
		| "/services/expo-workflow-optimization";
	bullets: string[];
};

type ServiceLine = {
	title: string;
	description: string;
};

function App() {
	const heroPhotoUrl = Route.useLoaderData();
	const projects: Project[] = [
		{
			name: "CAMPING-CAR PARK - Modernisation app mobile",
			product: [
				"App mobile grand public pour reserver et gerer des sejours en camping-car.",
			],
			impact: [
				"Refonte mobile + migration React Native legacy vers Expo.",
				"Referent mobile pour structuration du projet et autonomisation equipe.",
			],
			stack: [
				"React Native",
				"Expo",
				"Mobile",
				"Architecture",
			],
		},
		{
			name: "VAERDICT - Re-architecture application web metier",
			product: [
				"App web pour conseillers en gestion de patrimoine immobilier.",
			],
			impact: [
				"Reprise du codebase et restructuration pour l'evolutivite.",
				"Lead technique + formation pour renforcer l'equipe interne.",
			],
			stack: [
				"Web",
				"React",
				"TypeScript",
				"Architecture",
			],
		},
		{
			name: "LiNote - App mobile \"lien social\"",
			product: [
				"App mobile pour garder le lien avec des proches ages.",
			],
			impact: [
				"Developpement React Native from scratch aligne a l'app web.",
				"Fonctionnalites cles : rappels, messagerie, partage photo, appels video.",
			],
			stack: [
				"React Native",
				"Mobile",
				"iOS",
				"Android",
			],
		},
		{
			name: "Silbo - Sante : web + apps terrain",
			product: [
				"Startup sante : web d'optimisation des flux patients + apps terrain.",
			],
			impact: [
				"Cycle complet produit -> mise en production en collaboration produit.",
				"Focus fiabilite, temps reel et ergonomie iOS/Android.",
			],
			stack: [
				"Web",
				"Mobile",
				"Fiabilite",
				"Temps reel",
			],
		},
	];

	const testimonials: Testimonial[] = [
		{
			quote:
				"Simon est tres agreable en matiere de collaboration, il est experimente, il a su s'integrer a l'equipe et faire immediatement preuve d'implication. Il a egalement fait preuve d'une capacite d'adaptation et de synergie avec notre precieux developpeur historique. Tout cela nous permet d'entrevoir sereinement la poursuite du developpement de notre projet dans le temps.",
			name: "Eric",
			role: "CEO, Vaerdict",
		},
		{
			quote:
				"Tres bonne experience avec Simon. Communication facile, tres pro, qualite du code top et livraison rapide. Nous lui avons confie une nouvelle mission suite a celle-ci.",
			name: "Anthony",
			role: "CEO, LiNote",
		},
		{
			quote:
				"J'ai eu l'opportunite de travailler avec Simon pendant plus de deux ans au sein de mon equipe. Simon est un VRAI developpeur Full Stack par definition, il peut aussi bien ameliorer des composants UI, ameliorer le backend ou le mobile, comme faire de l'optimisation d'infrastructure cloud ou des pipelines de CI/CD. Force de proposition pour des architectures efficaces, il est aussi tres competent pour apprendre de nouveaux concepts complexes.",
			name: "Thomas",
			role: "CTO, Silbo",
		},
	];

	const serviceLines: ServiceLine[] = [
		{
			title: "Mobile product delivery",
			description:
				"React Native and Expo builds from MVP to production, with scalable architecture.",
		},
		{
			title: "Full-stack support",
			description:
				"API design, data modeling, and back office dashboards to complement mobile apps.",
		},
		{
			title: "Design-to-dev collaboration",
			description:
				"Crafted UIs, animation polish, and UI kits that stay consistent across teams.",
		},
	];

	const productizedServices: ProductizedService[] = [
		{
			title: "React Native legacy to Expo migration",
			description:
				"Move from legacy tooling to a modern Expo stack without disrupting your roadmap.",
			href: "/services/react-native-legacy-to-expo",
			bullets: [
				"Audit + migration plan",
				"Incremental rollout strategy",
				"Release-ready Expo build pipeline",
			],
		},
		{
			title: "Expo workflow optimisation",
			description:
				"Speed up build times, improve reliability, and keep CI/CD predictable.",
			href: "/services/expo-workflow-optimization",
			bullets: [
				"EAS build + submit tuning",
				"Environment + secrets audit",
				"Monitoring and release playbooks",
			],
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
							Mobile + Full-stack Freelance
						</p>
						<h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
							Building high-performance mobile experiences with React Native +
							Expo.
						</h1>
						{heroPhotoUrl ? (
							<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
								<div className="rounded-full border border-slate-200 bg-white/90 p-2 shadow-lg">
									<div className="size-20 overflow-hidden rounded-full bg-slate-100 md:size-24">
										<img
											src={heroPhotoUrl}
											alt="Simon Boisset"
											className="h-full w-full object-cover"
										/>
									</div>
								</div>
								<p className="rounded-[22px] rounded-tl-[8px] rounded-br-[30px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,248,240,0.92),rgba(236,248,246,0.9))] px-4 py-3 text-sm italic text-slate-600 shadow-sm md:text-base">
									"I'm Simon Boisset, a mobile-focused full-stack developer. I help
									teams ship polished apps, modernize legacy React Native stacks,
									and tighten delivery workflows."
								</p>
							</div>
						) : (
							<p className="text-lg text-slate-600 md:text-xl">
								I'm Simon Boisset, a mobile-focused full-stack developer. I help
								teams ship polished apps, modernize legacy React Native stacks,
								and tighten delivery workflows.
							</p>
						)}
						<div className="flex flex-wrap items-center gap-4">
							<Button asChild>
								<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
									Start a project <ArrowUpRight className="size-4" />
								</a>
							</Button>
							<Button variant="outline" asChild>
								<a href="/#services">View services</a>
							</Button>
							<Button
								asChild
								className="border border-[#0d1117] bg-[#0d1117] text-white hover:bg-[#161b22] hover:text-white"
							>
								<a href={GITHUB_URL} target="_blank" rel="noreferrer">
									GitHub <Github className="size-4" />
								</a>
							</Button>
						</div>
						<div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
							<div className="flex items-center gap-2">
								<Smartphone className="size-4 text-teal-700" />
								<span>React Native + Expo expertise</span>
							</div>
							<div className="flex items-center gap-2">
								<ShieldCheck className="size-4 text-amber-700" />
								<span>Production-ready delivery</span>
							</div>
							<div className="flex items-center gap-2">
								<Gauge className="size-4 text-slate-700" />
								<span>Performance & release tuning</span>
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm uppercase tracking-[0.2em] text-slate-500">
										Availability
									</p>
									<p className="text-2xl font-semibold text-slate-900">
										Now booking
									</p>
								</div>
								<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
									Open slots
								</span>
							</div>
							<ul className="mt-6 space-y-3 text-sm text-slate-600">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									Product discovery + roadmapping
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									Mobile app delivery, end-to-end
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-emerald-600" />
									Release automation and QA support
								</li>
							</ul>
						</div>
						<div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
										Signature focus
									</p>
									<p className="mt-2 text-2xl font-semibold">
										Expo-first delivery
									</p>
								</div>
								<Sparkles className="size-6 text-amber-300" />
							</div>
							<p className="mt-4 text-sm text-slate-300">
								From SDK upgrades to EAS workflows, I build a release system that
								keeps shipping predictable.
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
								Selected projects
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								Built for teams who move fast
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							Productized mobile builds, operational dashboards, and internal tools
							that help teams ship with confidence.
						</p>
					</div>
					<div className="mt-10 grid gap-6 lg:grid-cols-3">
						{projects.map((project, index) => (
							<ProjectCard key={project.name} index={index} project={project} />
						))}
					</div>
				</div>
			</section>

			<section id="services" className="bg-[#f3ede4] py-16 md:py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
								Services
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								React + Expo expertise for modern teams
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							From greenfield builds to legacy upgrades, I design delivery systems
							that keep your mobile roadmap moving.
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
								Testimonials
							</p>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								Teams that trusted the process
							</h2>
						</div>
						<p className="max-w-xl text-slate-600">
							Partnerships built on clarity, velocity, and deep React Native
							experience.
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
							Ready to ship
						</p>
						<h2 className="mt-3 text-3xl font-semibold md:text-4xl">
							Let's build a mobile roadmap you can trust.
						</h2>
						<p className="mt-3 text-slate-300">
							Share your goals and I'll respond within 48 hours with next steps.
						</p>
					</div>
					<Button asChild size="lg">
						<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
							Schedule a call <Rocket className="size-4" />
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
					Produit / entreprise
				</p>
				{project.product.map((line) => (
					<p key={line} className="text-sm text-slate-600">
						{line}
					</p>
				))}
			</div>
			<div className="mt-4 space-y-3">
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
					Impact / contributions
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
}: {
	service: ProductizedService;
	index: number;
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
				<Link to={service.href}>
					View details <ArrowUpRight className="size-4" />
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
