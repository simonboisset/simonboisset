import { createFileRoute } from "@tanstack/react-router";
import { type DocSummary, directus, type PostSummary } from "@/lib/directus";
import { buildLocalizedPath, type Locale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/seo";

const locales: Locale[] = ["fr-FR", "en-US"];

type Changefreq =
	| "always"
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "never";

type StaticPath = {
	path: string;
	changefreq: Changefreq;
	priority: number;
};

const staticPaths: StaticPath[] = [
	{ path: "/", changefreq: "weekly", priority: 1 },
	{ path: "/blog", changefreq: "weekly", priority: 0.7 },
	{ path: "/docs", changefreq: "yearly", priority: 0.3 },
	{ path: "/cv", changefreq: "monthly", priority: 0.5 },
];

const toLastMod = (value?: string | null) => {
	if (!value) return null;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const buildUrl = (path: string, locale: Locale) => {
	const localizedPath = buildLocalizedPath(path, undefined, undefined, locale);
	return `${SITE_URL}${localizedPath}`;
};

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

type UrlEntryOptions = {
	lastmod?: string | null;
	changefreq?: Changefreq;
	priority?: number;
	alternates?: { hrefLang: string; href: string }[];
};

const buildUrlEntry = (loc: string, options: UrlEntryOptions = {}) => {
	const { lastmod, changefreq, priority, alternates = [] } = options;
	const lastmodTag = lastmod
		? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
		: "";
	const changefreqTag = changefreq
		? `\n    <changefreq>${escapeXml(changefreq)}</changefreq>`
		: "";
	const priorityTag =
		priority !== undefined
			? `\n    <priority>${escapeXml(priority.toFixed(1))}</priority>`
			: "";
	const alternatesTags = alternates
		.map(
			(alternate) =>
				`\n    <xhtml:link rel="alternate" hreflang="${escapeXml(
					alternate.hrefLang,
				)}" href="${escapeXml(alternate.href)}" />`,
		)
		.join("");

	return `  <url>\n    <loc>${escapeXml(loc)}</loc>${alternatesTags}${lastmodTag}${changefreqTag}${priorityTag}\n  </url>`;
};

const buildSitemapXml = (
	entries: string[],
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

const buildLocalizedAlternates = (
	path: string,
	availableLocales: Locale[] = locales,
) => {
	const alternates = availableLocales.map((locale) => ({
		hrefLang: locale.startsWith("fr") ? "fr" : "en",
		href: buildUrl(path, locale),
	}));
	const defaultLocale = availableLocales.includes("fr-FR")
		? "fr-FR"
		: availableLocales[0];

	if (defaultLocale) {
		alternates.push({
			hrefLang: "x-default",
			href: buildUrl(path, defaultLocale),
		});
	}

	return alternates;
};

const groupBySlug = <T extends { slug: string }>(
	itemsByLocale: { locale: Locale; items: T[] }[],
) => {
	const grouped = new Map<string, { locale: Locale; item: T }[]>();
	itemsByLocale.forEach(({ locale, items }) => {
		items.forEach((item) => {
			const bucket = grouped.get(item.slug) ?? [];
			bucket.push({ locale, item });
			grouped.set(item.slug, bucket);
		});
	});
	return grouped;
};

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: async () => {
				const staticEntries = locales.flatMap((locale) =>
					staticPaths.map((entry) =>
						buildUrlEntry(buildUrl(entry.path, locale), {
							alternates: buildLocalizedAlternates(entry.path),
							changefreq: entry.changefreq,
							priority: entry.priority,
						}),
					),
				);

				const [postsByLocale, docsByLocale] = await Promise.all([
					Promise.all(
						locales.map((locale) => directus.getPosts({ data: { locale } })),
					),
					Promise.all(
						locales.map((locale) => directus.getDocs({ data: { locale } })),
					),
				]);

				const groupedPosts = groupBySlug<PostSummary>(
					postsByLocale.map((items, index) => ({
						locale: locales[index],
						items,
					})),
				);

				const postEntries = Array.from(groupedPosts.values()).flatMap(
					(group) => {
						const availableLocales = group.map(({ locale }) => locale);
						return group.map(({ locale, item }) =>
							buildUrlEntry(buildUrl(`/blog/${item.slug}`, locale), {
								alternates: buildLocalizedAlternates(
									`/blog/${item.slug}`,
									availableLocales,
								),
								lastmod: toLastMod(item.updatedAt ?? item.publishedAt),
								changefreq: "monthly",
								priority: 0.6,
							}),
						);
					},
				);

				const groupedDocs = groupBySlug<DocSummary>(
					docsByLocale.map((items, index) => ({
						locale: locales[index],
						items,
					})),
				);

				const docEntries = Array.from(groupedDocs.values()).flatMap((group) => {
					const availableLocales = group.map(({ locale }) => locale);
					return group.map(({ locale, item }) =>
						buildUrlEntry(buildUrl(`/docs/${item.slug}`, locale), {
							alternates: buildLocalizedAlternates(
								`/docs/${item.slug}`,
								availableLocales,
							),
							lastmod: toLastMod(item.updatedAt),
							changefreq: "yearly",
							priority: 0.3,
						}),
					);
				});

				const sitemap = buildSitemapXml([
					...staticEntries,
					...postEntries,
					...docEntries,
				]);

				return new Response(sitemap, {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
