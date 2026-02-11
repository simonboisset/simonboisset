import { createFileRoute } from "@tanstack/react-router";
import { Github, Globe, Linkedin, Mail } from "lucide-react";
import type React from "react";
import { HERO_PHOTO_ASSET_ID } from "@/lib/constants";
import { directus } from "@/lib/directus";
import { getTranslator, translations } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/cv")({
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const heroPhotoUrl = await directus.getAssetUrl({
			data: HERO_PHOTO_ASSET_ID,
		});
		return { locale, heroPhotoUrl };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.seo.cvTitle),
			description: t((t) => t.seo.cvDescription),
			path: "/cv",
			locale: loaderData.locale,
		});
	},
	component: CvPage,
});

function CvPage() {
	const { locale } = useI18n();
	const { heroPhotoUrl } = Route.useLoaderData();
	const cv = translations[locale].cv;
	const experience = Object.values(cv.experience).map((item) => ({
		...item,
		bullets: Object.values(item.bullets),
	}));
	const projects = Object.values(cv.projects).map((item) => ({
		...item,
		highlights: Object.values(item.highlights),
	}));
	const education = Object.values(cv.education);

	return (
		<div className="cv-page bg-[#f6f1ea] px-4 py-8 text-slate-900 md:px-6 md:py-10">
			<article className="cv-sheet mx-auto w-full max-w-[210mm] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
				<header className="cv-avoid-break border-b border-slate-200 pb-6">
					<div className="cv-header-grid grid gap-5 md:grid-cols-[1.45fr_0.75fr] md:items-start">
						<div>
							<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
								{cv.header.name}
							</h1>
							<p className="mt-1 text-base text-teal-700">{cv.header.title}</p>
							<p className="mt-2 text-sm text-slate-600">
								{cv.header.location}
							</p>
							<p className="mt-4 rounded-[22px] rounded-bl-[8px] rounded-tr-[30px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,248,240,0.92),rgba(236,248,246,0.9))] px-4 py-3 text-sm italic text-slate-600 shadow-sm md:text-base">
								{cv.summary}
							</p>
						</div>
						<div className="cv-header-aside cv-avoid-break mx-auto w-full max-w-[170px] md:justify-self-end">
							<div className="cv-avatar mx-auto aspect-square w-[132px] overflow-hidden rounded-full border-4 border-teal-100 bg-amber-50 shadow-sm">
								<img
									src={heroPhotoUrl}
									alt={cv.header.name}
									className="h-full w-full object-cover object-top"
									loading="eager"
								/>
							</div>
							<ul className="cv-contact-icons mt-4 flex flex-nowrap items-center justify-center gap-2 md:justify-end">
								<li>
									<IconBadgeLink
										href={`mailto:${cv.header.email}`}
										label={cv.header.email}
										icon={<Mail className="size-4" />}
									/>
								</li>
								<li>
									<IconBadgeLink
										href={cv.header.website}
										label="Website"
										icon={<Globe className="size-4" />}
									/>
								</li>
								<li>
									<IconBadgeLink
										href={cv.header.github}
										label="GitHub"
										icon={<Github className="size-4" />}
									/>
								</li>
								<li>
									<IconBadgeLink
										href={cv.header.linkedin}
										label="LinkedIn"
										icon={<Linkedin className="size-4" />}
									/>
								</li>
							</ul>
						</div>
					</div>
				</header>

				<section className="cv-section mt-6">
					<h2 className="cv-section-title">{cv.sections.experience}</h2>
					<div className="mt-3 grid gap-4">
						{experience.map((item) => (
							<CvListItem
								key={`${item.company}-${item.period}`}
								title={`${item.role} · ${item.company}`}
								right={[item.period]}
							>
								<ul className="cv-detail-list mt-2 grid gap-1 pl-4 text-sm text-slate-700">
									{item.bullets.map((bullet) => (
										<li key={bullet} className="list-disc">
											{bullet}
										</li>
									))}
								</ul>
							</CvListItem>
						))}
					</div>
				</section>

				<section className="cv-section mt-6">
					<h2 className="cv-section-title">{cv.sections.projects}</h2>
					<div className="mt-3 grid gap-4">
						{projects.map((project) => (
							<CvListItem
								key={project.name}
								title={project.name}
								right={project.stack.split(",").map((tech) => tech.trim())}
							>
								<p className="cv-detail-text mt-2 text-sm text-slate-700">
									{project.context}
								</p>
								<ul className="cv-detail-list mt-2 grid gap-1 pl-4 text-sm text-slate-700">
									{project.highlights.map((highlight) => (
										<li key={highlight} className="list-disc">
											{highlight}
										</li>
									))}
								</ul>
							</CvListItem>
						))}
					</div>
				</section>

				<section className="cv-section mt-6">
					<h2 className="cv-section-title">{cv.sections.education}</h2>
					<div className="mt-3 grid gap-4">
						{education.map((item) => (
							<CvListItem
								key={`${item.degree}-${item.period}`}
								title={item.degree}
								right={[item.period]}
							>
								<p className="cv-detail-text mt-1 text-sm text-slate-700">
									{item.school}
								</p>
								<p className="cv-detail-text mt-1 text-sm text-slate-700">
									{item.details}
								</p>
							</CvListItem>
						))}
					</div>
				</section>
			</article>
		</div>
	);
}

function IconBadgeLink({
	href,
	label,
	icon,
}: {
	href: string;
	label: string;
	icon: React.ReactNode;
}) {
	return (
		<a
			href={href}
			target={href.startsWith("mailto:") ? undefined : "_blank"}
			rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
			aria-label={label}
			title={label}
			className="cv-icon-badge inline-flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
		>
			<span aria-hidden="true">{icon}</span>
		</a>
	);
}

function CvMetaBadge({ value }: { value: string }) {
	return (
		<span className="inline-flex shrink-0 items-center self-start rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.02em] text-teal-700 sm:self-auto">
			{value}
		</span>
	);
}

function CvListItem({
	title,
	right,
	children,
}: {
	title: React.ReactNode;
	right?: string[];
	children: React.ReactNode;
}) {
	return (
		<article className="cv-list-item cv-avoid-break border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
				<h3 className="text-sm font-semibold text-slate-900">{title}</h3>
				{right && right.length > 0 ? (
					<div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
						{right.map((value) => (
							<CvMetaBadge key={value} value={value} />
						))}
					</div>
				) : null}
			</div>
			{children}
		</article>
	);
}
