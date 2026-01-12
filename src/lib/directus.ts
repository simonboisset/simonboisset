import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { env } from "@/env";
import { type Locale, localeSchema } from "@/lib/i18n/locale";

const PostSummarySchema = z.object({
	slug: z.string(),
	illustration: z.string().nullable(),
	imageUrl: z.string().nullable(),
	title: z.string(),
	publishedAt: z.string(),
	publishedAtLabel: z.string(),
});

const PostDetailsSchema = z.object({
	slug: z.string(),
	publishedAt: z.string(),
	publishedAtLabel: z.string(),
	illustration: z.string().nullable(),
	imageUrl: z.string().nullable(),
	title: z.string(),
	content: z.string(),
});

const DocSummarySchema = z.object({
	slug: z.string(),
	title: z.string(),
});

const DocDetailsSchema = z.object({
	slug: z.string(),
	title: z.string(),
	content: z.string(),
	updatedAtLabel: z.string(),
});

export type PostSummary = z.infer<typeof PostSummarySchema>;
export type PostDetails = z.infer<typeof PostDetailsSchema>;
export type DocSummary = z.infer<typeof DocSummarySchema>;
export type DocDetails = z.infer<typeof DocDetailsSchema>;

const assetUrl = (assetId: string | null): string | null => {
	if (!assetId) return null;
	return `${env.DIRECTUS_URL}/assets/${assetId}`;
};

const safeApiCall = async <I, T>(
	url: string,
	map: (data: I) => T,
	schema: z.ZodSchema<T>,
): Promise<T | null> => {
	try {
		const response = await fetch(url, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			console.error(`API error: ${response.status} - ${response.statusText}`);
			return null;
		}

		const rawData = await response.json();
		const parseResult = schema.safeParse(map(rawData));

		if (!parseResult.success) {
			console.error("Data validation error:", parseResult.error);
			return null;
		}

		return parseResult.data;
	} catch (error) {
		console.error("Directus API error:", error);
		return null;
	}
};

const formatDate = (date: string, locale: Locale): string =>
	new Date(date).toLocaleDateString(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

const getDirectusLocale = (locale: Locale) => {
	if (locale === "fr-FR") return "fr-FR";
	return "en-US";
};

type DirectusBlogPostSummaryResponse = {
	data: {
		slug: string;
		illustration: string | null;
		published_at: string;
		translations: { title: string }[];
	}[];
};

type DirectusBlogPostDetailsResponse = {
	data: {
		slug: string;
		published_at: string;
		illustration: string | null;
		translations: { title: string; content: string }[];
	}[];
};

type DirectusDocSummaryResponse = {
	data: {
		slug: string;
		translations: { title: string }[];
	}[];
};

type DirectusDocDetailsResponse = {
	data: {
		slug: string;
		updated_at: string;
		translations: { title: string; content: string }[];
	}[];
};

const getPosts = createServerFn({ method: "GET" })
	.inputValidator(z.object({ locale: localeSchema }))
	.handler(async ({ data }) => {
		const locale = data.locale;
		const localeCode = getDirectusLocale(locale);
		const url = `${env.DIRECTUS_URL}/items/blogposts?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&filter[translations][languages_code][_eq]=${localeCode}&fields=slug,illustration,translations.title,published_at&deep[translations][_filter][languages_code][_eq]=${localeCode}&sort=-published_at`;

		const result = await safeApiCall(
			url,
			(d: DirectusBlogPostSummaryResponse) =>
				d.data.map((post) => ({
					slug: post.slug,
					illustration: post.illustration,
					imageUrl: assetUrl(post.illustration),
					title: post.translations[0]?.title || "",
					publishedAt: post.published_at,
					publishedAtLabel: formatDate(post.published_at, locale),
				})),
			z.array(PostSummarySchema),
		);
		return result || [];
	});

const getPostDetails = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			slug: z.string().min(1),
			locale: localeSchema,
		}),
	)
	.handler(async ({ data }) => {
		const localeCode = getDirectusLocale(data.locale);
		const url = `${env.DIRECTUS_URL}/items/blogposts?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&fields=slug,published_at,illustration,translations.title,translations.content&filter[slug][_eq]=${data.slug}&deep[translations][_filter][languages_code][_eq]=${localeCode}`;

		const result = await safeApiCall(
			url,
			(d: DirectusBlogPostDetailsResponse) =>
				d.data.map((post) => ({
					slug: post.slug,
					publishedAt: post.published_at,
					publishedAtLabel: formatDate(post.published_at, data.locale),
					illustration: post.illustration,
					imageUrl: assetUrl(post.illustration),
					title: post.translations[0]?.title || "",
					content: post.translations[0]?.content || "",
				}))[0],
			PostDetailsSchema,
		);

		return result;
	});

const getDocs = createServerFn({ method: "GET" })
	.inputValidator(z.object({ locale: localeSchema }))
	.handler(async ({ data }) => {
		const localeCode = getDirectusLocale(data.locale);
		const url = `${env.DIRECTUS_URL}/items/documents?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&deep[translations][_filter][languages_code][_eq]=${localeCode}&fields=slug,translations.title`;

		const result = await safeApiCall(
			url,
			(d: DirectusDocSummaryResponse) =>
				d.data.map((doc) => ({
					slug: doc.slug,
					title: doc.translations[0]?.title || "",
				})),
			z.array(DocSummarySchema),
		);

		return result || [];
	});

const getDoc = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			slug: z.string().min(1),
			locale: localeSchema,
		}),
	)
	.handler(async ({ data }) => {
		const localeCode = getDirectusLocale(data.locale);
		const url = `${env.DIRECTUS_URL}/items/documents?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&filter[slug][_eq]=${data.slug}&deep[translations][_filter][languages_code][_eq]=${localeCode}&fields=slug,updated_at,translations.title,translations.content`;

		const result = await safeApiCall(
			url,
			(d: DirectusDocDetailsResponse) =>
				d.data.map((doc) => ({
					slug: doc.slug,
					title: doc.translations[0]?.title || "",
					content: doc.translations[0]?.content || "",
					updatedAtLabel: formatDate(doc.updated_at, data.locale),
				}))[0],
			DocDetailsSchema,
		);

		return result;
	});

const getAssetUrl = createServerFn({ method: "GET" })
	.inputValidator(z.string().min(1))
	.handler(({ data: assetId }) => `${env.DIRECTUS_URL}/assets/${assetId}`);

export const directus = {
	getPosts,
	getPostDetails,
	getDocs,
	getDoc,
	getAssetUrl,
};
