import { buildLocalizedPath, type Locale } from "@/lib/i18n/locale";

export const SITE_URL = "https://simonboisset.com";
export const SITE_NAME = "Simon Boisset";

type SeoInput = {
	title: string;
	description: string;
	path: string;
	locale: Locale;
	imageUrl?: string | null;
	type?: "website" | "article";
};

const ensureLeadingSlash = (path: string) =>
	path.startsWith("/") ? path : `/${path}`;

const buildCanonicalUrl = (path: string, locale: Locale) => {
	const normalizedPath = ensureLeadingSlash(path);
	const localizedPath = buildLocalizedPath(
		normalizedPath,
		undefined,
		undefined,
		locale,
	);
	return `${SITE_URL}${localizedPath}`;
};

const buildTitle = (title: string) => `${title} - ${SITE_NAME}`;

const normalizeWhitespace = (value: string) =>
	value.replace(/\s+/g, " ").trim();

export const stripHtml = (value: string) =>
	normalizeWhitespace(value.replace(/<[^>]*>/g, " "));

export const toExcerpt = (value: string, maxLength = 160) => {
	const normalized = normalizeWhitespace(value);
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
};

export const buildSeo = ({
	title,
	description,
	path,
	locale,
	imageUrl,
	type = "website",
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

	return {
		meta,
		links: [{ rel: "canonical", href: canonicalUrl }],
	};
};
