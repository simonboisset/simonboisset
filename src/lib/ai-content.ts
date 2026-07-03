import { SCHEDULE_VISIO_URL } from "./constants";
import type {
	DocDetails,
	DocSummary,
	PostDetails,
	PostSummary,
} from "./directus";
import { getTranslator } from "./i18n";
import {
	type Locale,
	type LocaleSegment,
	localeToPathSegment,
	stripLocaleFromPathname,
} from "./i18n/locale";
import {
	buildCanonicalUrl,
	decodeHtmlEntities,
	SITE_NAME,
	SITE_URL,
	toExcerpt,
} from "./seo";

type AgentFormat = "markdown" | "text";

type LocaleItems<T> = {
	locale: Locale;
	items: T[];
};

type AgentResponseInput = {
	body: string;
	canonicalUrl: string;
	format: AgentFormat;
};

const CACHE_CONTROL = "public, max-age=300, s-maxage=3600";

const joinBlocks = (blocks: (string | null | undefined)[]) =>
	blocks
		.map((block) => block?.trim())
		.filter(Boolean)
		.join("\n\n")
		.concat("\n");

const stripHtmlPreservingLines = (value: string) =>
	decodeHtmlEntities(
		value
			.replace(/<br\s*\/?>/gi, "\n")
			.replace(
				/<\/(p|div|section|article|h[1-6]|li|ul|ol|blockquote|pre)>/gi,
				"\n",
			)
			.replace(/<[^>]*>/g, " "),
	);

const stripMarkdownToText = (value: string) => {
	const withoutCodeFences = value.replace(
		/```[^\n]*\n([\s\S]*?)```/g,
		(_, code: string) => `\n${code.trim()}\n`,
	);
	const withExpandedImages = withoutCodeFences.replace(
		/!\[([^\]]*)\]\(([^)]+)\)/g,
		(_, alt: string, url: string) => (alt ? `${alt}: ${url}` : url),
	);
	const withExpandedLinks = withExpandedImages.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		(_, label: string, url: string) => `${label}: ${url}`,
	);
	const withoutMarkdown = withExpandedLinks
		.replace(/^\s*#{1,6}\s+/gm, "")
		.replace(/^>\s?/gm, "")
		.replace(/^\s*[-*+]\s+/gm, "")
		.replace(/^\s*\d+\.\s+/gm, "")
		.replace(/[*_~`]/g, "");

	return stripHtmlPreservingLines(withoutMarkdown)
		.split("\n")
		.map((line) => line.replace(/[ \t]+/g, " ").trim())
		.filter(Boolean)
		.join("\n");
};

const metadataMarkdown = (items: Record<string, string | null | undefined>) =>
	Object.entries(items)
		.filter(([, value]) => value)
		.map(([label, value]) => `${label}: ${value}`)
		.join("\n");

const metadataText = metadataMarkdown;

export const contentLocaleToLocale = (contentLocale: string): Locale | null => {
	if (contentLocale === "fr") return "fr-FR";
	if (contentLocale === "en") return "en-US";
	return null;
};

export const getCanonicalPageUrl = (path: string, locale: Locale) =>
	buildCanonicalUrl(path, locale);

export const getAgentContentUrls = (path: string, locale: Locale) => {
	const segment = localeToPathSegment(locale);
	const cleanPath = path.replace(/^\/+|\/+$/g, "");
	const contentPath =
		cleanPath === ""
			? "home"
			: cleanPath
					.split("/")
					.map((part) => encodeURIComponent(part))
					.join("/");

	return {
		markdownUrl: `${SITE_URL}/content/${segment}/${contentPath}.md`,
		textUrl: `${SITE_URL}/content/${segment}/${contentPath}.txt`,
	};
};

export const getAgentReadableRedirectPath = (
	pathname: string,
	locale: Locale,
) => {
	const contentPath = stripLocaleFromPathname(pathname);
	const match = contentPath.match(/^\/(blog|docs)\/(.+)\.(md|txt)$/);
	if (!match) return null;

	const [, section, slug, extension] = match;
	if (!section || !slug || !extension) return null;

	return `/content/${localeToPathSegment(locale)}/${section}/${encodeURIComponent(
		slug,
	)}.${extension}`;
};

export const buildAgentContentResponse = ({
	body,
	canonicalUrl,
	format,
}: AgentResponseInput) =>
	new Response(body, {
		headers: {
			"Cache-Control": CACHE_CONTROL,
			"Content-Type":
				format === "markdown"
					? "text/markdown; charset=utf-8"
					: "text/plain; charset=utf-8",
			Link: `<${canonicalUrl}>; rel="canonical"`,
			"X-Robots-Tag": "noindex, follow",
		},
	});

const homeRisks = (locale: Locale) => {
	const t = getTranslator(locale);
	return [
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
};

const homeTestimonials = (locale: Locale) => {
	const t = getTranslator(locale);
	return [
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
};

const homeMethodPhases = (locale: Locale) => {
	const t = getTranslator(locale);
	return [
		{
			title: t((t) => t.home.method.audit.title),
			description: t((t) => t.home.method.audit.description),
			outcome: t((t) => t.home.method.audit.outcome),
		},
		{
			title: t((t) => t.home.method.migration.title),
			description: t((t) => t.home.method.migration.description),
			outcome: t((t) => t.home.method.migration.outcome),
		},
		{
			title: t((t) => t.home.method.release.title),
			description: t((t) => t.home.method.release.description),
			outcome: t((t) => t.home.method.release.outcome),
		},
		{
			title: t((t) => t.home.method.handoff.title),
			description: t((t) => t.home.method.handoff.description),
			outcome: t((t) => t.home.method.handoff.outcome),
		},
	];
};

export const renderHomeMarkdown = (locale: Locale) => {
	const t = getTranslator(locale);
	const canonicalUrl = getCanonicalPageUrl("/", locale);
	const risks = homeRisks(locale);
	const testimonials = homeTestimonials(locale);
	const phases = homeMethodPhases(locale);

	return joinBlocks([
		`# ${t((t) => t.home.hero.title)}`,
		metadataMarkdown({
			Type: "homepage",
			Language: locale,
			"Canonical URL": canonicalUrl,
		}),
		t((t) => t.home.hero.intro),
		[
			`## ${t((t) => t.home.servicesSection.title)}`,
			t((t) => t.home.servicesSection.description),
			risks
				.map((risk) => `- ${risk.title}: ${risk.description} ${risk.bullet}`)
				.join("\n"),
		].join("\n\n"),
		[
			`## ${t((t) => t.home.testimonialsSection.title)}`,
			t((t) => t.home.testimonialsSection.description),
			testimonials
				.map((testimonial) => `- ${testimonial.name}: ${testimonial.quote}`)
				.join("\n"),
		].join("\n\n"),
		[
			`## ${t((t) => t.home.method.title)}`,
			t((t) => t.home.method.description),
			phases
				.map(
					(phase) =>
						`- ${phase.title}: ${phase.description} Outcome: ${phase.outcome}`,
				)
				.join("\n"),
		].join("\n\n"),
		[
			"## Related links",
			`- [Website](${canonicalUrl})`,
			`- [Blog](${getCanonicalPageUrl("/blog", locale)})`,
			`- [Legal documents](${getCanonicalPageUrl("/docs", locale)})`,
			`- [Schedule a call](${SCHEDULE_VISIO_URL})`,
		].join("\n"),
	]);
};

export const renderHomeText = (locale: Locale) => {
	const t = getTranslator(locale);
	const canonicalUrl = getCanonicalPageUrl("/", locale);
	const risks = homeRisks(locale);
	const testimonials = homeTestimonials(locale);
	const phases = homeMethodPhases(locale);

	return joinBlocks([
		t((t) => t.home.hero.title),
		metadataText({
			Type: "homepage",
			Language: locale,
			"Canonical URL": canonicalUrl,
		}),
		t((t) => t.home.hero.intro),
		[
			t((t) => t.home.servicesSection.title),
			t((t) => t.home.servicesSection.description),
			risks
				.map((risk) => `${risk.title}: ${risk.description} ${risk.bullet}`)
				.join("\n"),
		].join("\n\n"),
		[
			t((t) => t.home.testimonialsSection.title),
			t((t) => t.home.testimonialsSection.description),
			testimonials
				.map((testimonial) => `${testimonial.name}: ${testimonial.quote}`)
				.join("\n"),
		].join("\n\n"),
		[
			t((t) => t.home.method.title),
			t((t) => t.home.method.description),
			phases
				.map(
					(phase) =>
						`${phase.title}: ${phase.description} Outcome: ${phase.outcome}`,
				)
				.join("\n"),
		].join("\n\n"),
		[
			"Related links",
			`Website: ${canonicalUrl}`,
			`Blog: ${getCanonicalPageUrl("/blog", locale)}`,
			`Legal documents: ${getCanonicalPageUrl("/docs", locale)}`,
			`Schedule a call: ${SCHEDULE_VISIO_URL}`,
		].join("\n"),
	]);
};

export const renderPostMarkdown = (post: PostDetails, locale: Locale) => {
	const canonicalUrl = getCanonicalPageUrl(`/blog/${post.slug}`, locale);
	const summary = toExcerpt(stripMarkdownToText(post.content));

	return joinBlocks([
		`# ${post.title}`,
		metadataMarkdown({
			Type: "blog post",
			Language: locale,
			"Canonical URL": canonicalUrl,
			Published: post.publishedAtLabel,
			Modified: post.updatedAt ?? undefined,
			Summary: summary,
		}),
		post.content,
		[
			"## Related links",
			`- [Blog index](${getCanonicalPageUrl("/blog", locale)})`,
			`- [Website](${getCanonicalPageUrl("/", locale)})`,
		].join("\n"),
	]);
};

export const renderPostText = (post: PostDetails, locale: Locale) => {
	const canonicalUrl = getCanonicalPageUrl(`/blog/${post.slug}`, locale);
	const content = stripMarkdownToText(post.content);
	const summary = toExcerpt(content);

	return joinBlocks([
		post.title,
		metadataText({
			Type: "blog post",
			Language: locale,
			"Canonical URL": canonicalUrl,
			Published: post.publishedAtLabel,
			Modified: post.updatedAt ?? undefined,
			Summary: summary,
		}),
		content,
		[
			"Related links",
			`Blog index: ${getCanonicalPageUrl("/blog", locale)}`,
			`Website: ${getCanonicalPageUrl("/", locale)}`,
		].join("\n"),
	]);
};

export const renderDocMarkdown = (doc: DocDetails, locale: Locale) => {
	const canonicalUrl = getCanonicalPageUrl(`/docs/${doc.slug}`, locale);
	const summary = toExcerpt(stripMarkdownToText(doc.content));

	return joinBlocks([
		`# ${doc.title}`,
		metadataMarkdown({
			Type: "document",
			Language: locale,
			"Canonical URL": canonicalUrl,
			Updated: doc.updatedAtLabel,
			Summary: summary,
		}),
		doc.content,
		[
			"## Related links",
			`- [Documents index](${getCanonicalPageUrl("/docs", locale)})`,
			`- [Website](${getCanonicalPageUrl("/", locale)})`,
		].join("\n"),
	]);
};

export const renderDocText = (doc: DocDetails, locale: Locale) => {
	const canonicalUrl = getCanonicalPageUrl(`/docs/${doc.slug}`, locale);
	const content = stripMarkdownToText(doc.content);
	const summary = toExcerpt(content);

	return joinBlocks([
		doc.title,
		metadataText({
			Type: "document",
			Language: locale,
			"Canonical URL": canonicalUrl,
			Updated: doc.updatedAtLabel,
			Summary: summary,
		}),
		content,
		[
			"Related links",
			`Documents index: ${getCanonicalPageUrl("/docs", locale)}`,
			`Website: ${getCanonicalPageUrl("/", locale)}`,
		].join("\n"),
	]);
};

const localeLabel = (locale: Locale) =>
	locale === "fr-FR" ? "French" : "English";

const markdownContentLink = (label: string, url: string, description: string) =>
	`- [${label}](${url}): ${description}`;

const pushOptionalTextLinks = <T extends { slug?: string; title?: string }>(
	lines: string[],
	itemsByLocale: LocaleItems<T>[],
	kind: "blog" | "docs",
) => {
	for (const { locale, items } of itemsByLocale) {
		for (const item of items) {
			if (!item.slug || !item.title) continue;
			const urls = getAgentContentUrls(`/${kind}/${item.slug}`, locale);
			lines.push(
				markdownContentLink(
					`${item.title} (${localeLabel(locale)}, plain text)`,
					urls.textUrl,
					"Plain-text fallback.",
				),
			);
		}
	}
};

export const renderLlmsTxt = ({
	postsByLocale,
	docsByLocale,
}: {
	postsByLocale: LocaleItems<PostSummary>[];
	docsByLocale: LocaleItems<DocSummary>[];
}) => {
	const coreLinks: string[] = [];
	const optionalLinks: string[] = [];

	for (const locale of ["fr-FR", "en-US"] satisfies Locale[]) {
		const segment = localeToPathSegment(locale);
		const homeUrls = getAgentContentUrls("/", locale);
		coreLinks.push(
			markdownContentLink(
				`Homepage (${localeLabel(locale)})`,
				homeUrls.markdownUrl,
				"Positioning, service scope, testimonials, and method.",
			),
		);
		optionalLinks.push(
			markdownContentLink(
				`Homepage (${localeLabel(locale)}, plain text)`,
				homeUrls.textUrl,
				"Plain-text fallback.",
			),
		);
		coreLinks.push(
			markdownContentLink(
				`HTML homepage (${segment})`,
				getCanonicalPageUrl("/", locale),
				"Canonical human-readable page.",
			),
		);
	}

	const blogLinks = postsByLocale.flatMap(({ locale, items }) =>
		items.map((post) => {
			const urls = getAgentContentUrls(`/blog/${post.slug}`, locale);
			return markdownContentLink(
				`${post.title} (${localeLabel(locale)})`,
				urls.markdownUrl,
				`Blog post published ${post.publishedAtLabel}.`,
			);
		}),
	);

	const docLinks = docsByLocale.flatMap(({ locale, items }) =>
		items.map((doc) => {
			const urls = getAgentContentUrls(`/docs/${doc.slug}`, locale);
			return markdownContentLink(
				`${doc.title} (${localeLabel(locale)})`,
				urls.markdownUrl,
				"Public legal document.",
			);
		}),
	);

	pushOptionalTextLinks(optionalLinks, postsByLocale, "blog");
	pushOptionalTextLinks(optionalLinks, docsByLocale, "docs");

	return joinBlocks([
		`# ${SITE_NAME}`,
		"> Personal site for React Native to Expo migration support, field notes, resume, and legal documents.",
		"Use the Markdown URLs first. Plain-text URLs are provided as optional fallbacks for agents or crawlers that prefer unformatted text.",
		["## Core pages", ...coreLinks].join("\n"),
		blogLinks.length ? ["## Blog posts", ...blogLinks].join("\n") : null,
		docLinks.length ? ["## Documents", ...docLinks].join("\n") : null,
		[
			"## Optional",
			...optionalLinks,
			markdownContentLink(
				"Sitemap",
				`${SITE_URL}/sitemap.xml`,
				"Canonical XML sitemap for search crawlers.",
			),
		].join("\n"),
	]);
};

export const renderLlmsFullMarkdown = ({
	postsByLocale,
	docsByLocale,
}: {
	postsByLocale: LocaleItems<PostDetails>[];
	docsByLocale: LocaleItems<DocDetails>[];
}) =>
	joinBlocks([
		`# ${SITE_NAME} full agent context`,
		"> Aggregated public Markdown content for agents. HTML pages remain canonical.",
		renderHomeMarkdown("fr-FR"),
		renderHomeMarkdown("en-US"),
		...postsByLocale.flatMap(({ locale, items }) =>
			items.map((post) => renderPostMarkdown(post, locale)),
		),
		...docsByLocale.flatMap(({ locale, items }) =>
			items.map((doc) => renderDocMarkdown(doc, locale)),
		),
	]);

export const localeSegments = ["fr", "en"] satisfies LocaleSegment[];
