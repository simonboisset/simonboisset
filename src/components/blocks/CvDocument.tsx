import { Github, Globe, Linkedin, Mail } from "lucide-react";
import type React from "react";
import { translations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function buildCvContent(locale: Locale) {
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

	return { cv, experience, projects, education };
}

type CvContent = ReturnType<typeof buildCvContent>;

export function CvDocument({
	content,
	heroPhotoUrl,
}: {
	content: CvContent;
	heroPhotoUrl: string;
}) {
	const { cv, experience, projects, education } = content;

	return (
		<div className="bg-[#f6f1ea] px-4 py-8 text-slate-900 print:bg-white print:p-0 md:px-6 md:py-10">
			<article className="mx-auto w-full max-w-[210mm] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:m-0 print:min-h-[297mm] print:w-[210mm] print:max-w-[210mm] print:rounded-none print:border-0 print:p-0 print:shadow-none md:p-10">
				<CvHeader cv={cv} heroPhotoUrl={heroPhotoUrl} />

				<CvSection title={cv.sections.experience}>
					{experience.map((item) => (
						<CvListItem
							key={`${item.company}-${item.period}`}
							title={`${item.role} · ${item.company}`}
							right={[item.period]}
						>
							<ul className="mt-2 grid gap-1 pl-4 text-sm text-slate-700 print:mt-[0.3rem] print:gap-[0.1rem] print:pl-[0.9rem]">
								{item.bullets.map((bullet) => (
									<li
										key={bullet}
										className="list-disc print:text-[11.5px] print:leading-[1.2]"
									>
										{bullet}
									</li>
								))}
							</ul>
						</CvListItem>
					))}
				</CvSection>

				<CvSection title={cv.sections.projects}>
					{projects.map((project) => (
						<CvListItem
							key={project.name}
							title={project.name}
							right={project.stack.split(",").map((tech) => tech.trim())}
						>
							<p className="mt-2 text-sm text-slate-700 print:mt-0 print:text-xs print:leading-[1.25]">
								{project.context}
							</p>
							<ul className="mt-2 grid gap-1 pl-4 text-sm text-slate-700 print:mt-[0.3rem] print:gap-[0.1rem] print:pl-[0.9rem]">
								{project.highlights.map((highlight) => (
									<li
										key={highlight}
										className="list-disc print:text-[11.5px] print:leading-[1.2]"
									>
										{highlight}
									</li>
								))}
							</ul>
						</CvListItem>
					))}
				</CvSection>

				<CvSection title={cv.sections.education}>
					{education.map((item) => (
						<CvListItem
							key={`${item.degree}-${item.period}`}
							title={item.degree}
							right={[item.period]}
						>
							<p className="mt-1 text-sm text-slate-700 print:text-xs print:leading-[1.25]">
								{item.school}
							</p>
							<p className="mt-1 text-sm text-slate-700 print:text-xs print:leading-[1.25]">
								{item.details}
							</p>
						</CvListItem>
					))}
				</CvSection>
			</article>
		</div>
	);
}

function CvHeader({
	cv,
	heroPhotoUrl,
}: {
	cv: CvContent["cv"];
	heroPhotoUrl: string;
}) {
	return (
		<header className="print:break-inside-avoid border-b border-slate-200 pb-6">
			<div className="grid gap-5 print:grid-cols-[1.45fr_0.75fr] print:items-start md:grid-cols-[1.45fr_0.75fr] md:items-start">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
						{cv.header.name}
					</h1>
					<p className="mt-1 text-base text-teal-700">{cv.header.title}</p>
					<p className="mt-2 text-sm text-slate-600">{cv.header.location}</p>
					<p className="mt-4 rounded-[22px] rounded-br-[8px] rounded-tl-[30px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,248,240,0.92),rgba(236,248,246,0.9))] px-4 py-3 text-sm italic text-slate-600 shadow-sm md:text-base">
						{cv.summary}
					</p>
				</div>
				<div className="print:break-inside-avoid mx-auto w-full max-w-[170px] print:justify-self-end md:justify-self-end">
					<div className="mx-auto aspect-square w-[132px] overflow-hidden rounded-full border-4 border-teal-100 bg-amber-50 shadow-sm print:overflow-hidden print:rounded-full print:shadow-none">
						<img
							src={heroPhotoUrl}
							alt={cv.header.name}
							className="h-full w-full object-cover object-top"
							loading="eager"
						/>
					</div>
					<ul className="mt-4 flex flex-nowrap items-center justify-center gap-2 print:justify-end md:justify-end">
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
	);
}

function CvSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="mt-6 print:mt-3">
			<h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
				{title}
			</h2>
			<div className="mt-3 grid gap-4">{children}</div>
		</section>
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
			className="inline-flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700 print:rounded-full print:shadow-none print:no-underline"
		>
			<span aria-hidden="true">{icon}</span>
			<span className="sr-only">{label}</span>
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
		<article className="print:break-inside-avoid border-b border-slate-100 pb-4 last:border-b-0 last:pb-0 print:pb-[0.45rem]">
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
