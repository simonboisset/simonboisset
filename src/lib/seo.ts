import { buildLocalizedPath, type Locale } from "@/lib/i18n/locale";

export const SITE_URL = "https://simonboisset.com";
export const SITE_NAME = "Simon Boisset";
export const SITE_AUTHOR = "Simon Boisset";

type SeoInput = {
	title: string;
	description: string;
	path: string;
	locale: Locale;
	imageUrl?: string | null;
	type?: "website" | "article";
	structuredData?: StructuredData | StructuredData[];
	agentReadable?: {
		markdownUrl: string;
		textUrl: string;
	};
};

export type StructuredData = Record<string, unknown>;

const ensureLeadingSlash = (path: string) =>
	path.startsWith("/") ? path : `/${path}`;

export const buildCanonicalUrl = (path: string, locale: Locale) => {
	const normalizedPath = ensureLeadingSlash(path);
	const localizedPath = buildLocalizedPath(
		normalizedPath,
		undefined,
		undefined,
		locale,
	);
	return `${SITE_URL}${localizedPath}`;
};

const buildLocalizedUrl = (path: string, locale: Locale) =>
	buildCanonicalUrl(path, locale);

const buildTitle = (title: string) => `${title} - ${SITE_NAME}`;

const normalizeWhitespace = (value: string) =>
	value.replace(/\s+/g, " ").trim();

export const decodeHtmlEntities = (value: string) =>
	value
		.replace(/&amp;#(\d+);/g, (_, codePoint: string) =>
			String.fromCodePoint(Number(codePoint)),
		)
		.replace(/&#(\d+);/g, (_, codePoint: string) =>
			String.fromCodePoint(Number(codePoint)),
		)
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">");

export const stripHtml = (value: string) =>
	normalizeWhitespace(decodeHtmlEntities(value.replace(/<[^>]*>/g, " ")));

export const toExcerpt = (value: string, maxLength = 160) => {
	const normalized = normalizeWhitespace(decodeHtmlEntities(value));
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
};

const buildAlternates = (path: string) => [
	{ rel: "alternate", hrefLang: "fr", href: buildLocalizedUrl(path, "fr-FR") },
	{ rel: "alternate", hrefLang: "en", href: buildLocalizedUrl(path, "en-US") },
	{
		rel: "alternate",
		hrefLang: "x-default",
		href: buildLocalizedUrl(path, "fr-FR"),
	},
];

const buildStructuredDataScripts = (
	structuredData?: StructuredData | StructuredData[],
) => {
	if (!structuredData) return undefined;
	const entries = Array.isArray(structuredData)
		? structuredData
		: [structuredData];
	return entries.map((entry) => ({
		type: "application/ld+json",
		children: JSON.stringify(entry),
	}));
};

export const buildSeo = ({
	title,
	description,
	path,
	locale,
	imageUrl,
	type = "website",
	structuredData,
	agentReadable,
}: SeoInput) => {
	const canonicalUrl = buildCanonicalUrl(path, locale);
	const pageTitle = buildTitle(title);
	const meta = [
		{ title: pageTitle },
		{ name: "description", content: description },
		{ property: "og:site_name", content: SITE_NAME },
		{ property: "og:title", content: pageTitle },
		{ property: "og:description", content: description },
		{ property: "og:type", content: type },
		{ property: "og:url", content: canonicalUrl },
		{
			name: "twitter:card",
			content: imageUrl ? "summary_large_image" : "summary",
		},
		{ name: "twitter:title", content: pageTitle },
		{ name: "twitter:description", content: description },
	];

	if (imageUrl) {
		meta.push({ property: "og:image", content: imageUrl });
		meta.push({ name: "twitter:image", content: imageUrl });
	}

	const links: {
		rel: string;
		href: string;
		hrefLang?: string;
		type?: string;
	}[] = [{ rel: "canonical", href: canonicalUrl }, ...buildAlternates(path)];

	if (agentReadable) {
		links.push({
			rel: "alternate",
			type: "text/markdown",
			href: agentReadable.markdownUrl,
		});
		links.push({
			rel: "alternate",
			type: "text/plain",
			href: agentReadable.textUrl,
		});
	}

	return {
		meta,
		links,
		scripts: buildStructuredDataScripts(structuredData),
	};
};

export const buildPersonStructuredData = () => ({
	"@context": "https://schema.org",
	"@type": "Person",
	name: SITE_AUTHOR,
	url: SITE_URL,
	jobTitle: "Mobile-focused full-stack developer",
	knowsAbout: [
		"React Native",
		"Expo",
		"React",
		"TypeScript",
		"Mobile app delivery",
	],
	sameAs: ["https://github.com/simonboisset"],
});

export const buildProfessionalServiceStructuredData = (locale: Locale) => ({
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: SITE_NAME,
	url: buildLocalizedUrl("/", locale),
	areaServed: "France",
	description:
		locale === "fr-FR"
			? "Développement mobile et full-stack avec React Native, Expo, React et TypeScript."
			: "Mobile and full-stack development with React Native, Expo, React, and TypeScript.",
	provider: {
		"@type": "Person",
		name: SITE_AUTHOR,
	},
});

export const buildArticleStructuredData = ({
	title,
	description,
	path,
	locale,
	imageUrl,
	publishedAt,
	modifiedAt,
}: {
	title: string;
	description: string;
	path: string;
	locale: Locale;
	imageUrl?: string | null;
	publishedAt?: string;
	modifiedAt?: string | null;
}) => ({
	"@context": "https://schema.org",
	"@type": "Article",
	headline: title,
	description,
	url: buildLocalizedUrl(path, locale),
	inLanguage: locale,
	datePublished: publishedAt,
	dateModified: modifiedAt ?? publishedAt,
	image: imageUrl || undefined,
	author: {
		"@type": "Person",
		name: SITE_AUTHOR,
		url: SITE_URL,
	},
	publisher: {
		"@type": "Person",
		name: SITE_AUTHOR,
		url: SITE_URL,
	},
});

export const buildBreadcrumbStructuredData = (
	items: { name: string; url: string }[],
) => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.name,
		item: item.url,
	})),
});

export const buildItemListStructuredData = (
	items: { name: string; url: string }[],
) => ({
	"@context": "https://schema.org",
	"@type": "ItemList",
	itemListElement: items.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.name,
		url: item.url,
	})),
});

export const buildFaqStructuredData = (
	items: { question: string; answer: string }[],
) => ({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: items.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: item.answer,
		},
	})),
});
