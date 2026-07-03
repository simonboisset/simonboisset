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
	updatedAt: z.string().nullable().optional(),
});

const PostDetailsSchema = z.object({
	slug: z.string(),
	publishedAt: z.string(),
	publishedAtLabel: z.string(),
	illustration: z.string().nullable(),
	imageUrl: z.string().nullable(),
	title: z.string(),
	content: z.string(),
	updatedAt: z.string().nullable().optional(),
});

const DocSummarySchema = z.object({
	slug: z.string(),
	title: z.string(),
	updatedAt: z.string().nullable().optional(),
});

const DocDetailsSchema = z.object({
	slug: z.string(),
	title: z.string(),
	content: z.string(),
	updatedAt: z.string().nullable().optional(),
	updatedAtLabel: z.string(),
});

export type PostSummary = z.infer<typeof PostSummarySchema>;
export type PostDetails = z.infer<typeof PostDetailsSchema>;
export type DocSummary = z.infer<typeof DocSummarySchema>;
export type DocDetails = z.infer<typeof DocDetailsSchema>;

const DirectusAssetOptionsSchema = z.object({
	assetId: z.string().min(1),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
	fit: z.enum(["cover", "contain", "inside", "outside"]).optional(),
	format: z.enum(["webp", "jpg", "png", "avif"]).optional(),
	quality: z.number().int().min(1).max(100).optional(),
	withoutEnlargement: z.boolean().optional(),
});

const DirectusAssetInputSchema = z.union([
	z.string().min(1),
	DirectusAssetOptionsSchema,
]);

type DirectusAssetOptions = z.infer<typeof DirectusAssetOptionsSchema>;

export const buildDirectusItemsUrl = (
	collection: "blogposts" | "documents",
	params: Record<string, string>,
) => {
	const url = new URL(`/items/${collection}`, env.DIRECTUS_URL);

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	return url.toString();
};

function assetUrl(
	assetId: string,
	options?: Omit<DirectusAssetOptions, "assetId">,
): string;
function assetUrl(
	assetId: null,
	options?: Omit<DirectusAssetOptions, "assetId">,
): null;
function assetUrl(
	assetId: string | null,
	options?: Omit<DirectusAssetOptions, "assetId">,
): string | null;
function assetUrl(
	assetId: string | null,
	options?: Omit<DirectusAssetOptions, "assetId">,
): string | null {
	if (!assetId) return null;

	const url = new URL(`/assets/${assetId}`, env.DIRECTUS_URL);

	if (options) {
		for (const [key, value] of Object.entries(options)) {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		}
	}

	return url.toString();
}

const safeApiCall = async <I, T>(
	url: string,
	map: (data: I) => T,
	schema: z.ZodSchema<T>,
): Promise<T | null> => {
	let rawData: unknown;

	try {
		const response = await fetch(url, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Directus API error: ${response.status}`);
		}

		rawData = await response.json();
	} catch (error) {
		console.error("Directus API error:", error);
		throw error;
	}

	const parseResult = schema.safeParse(map(rawData as I));

	if (!parseResult.success) {
		console.error("Data validation error:", parseResult.error);
		return null;
	}

	return parseResult.data;
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
		updated_at?: string | null;
		translations: { title: string }[];
	}[];
};

type DirectusBlogPostDetailsResponse = {
	data: {
		slug: string;
		published_at: string;
		updated_at?: string | null;
		illustration: string | null;
		translations: { title: string; content: string }[];
	}[];
};

type DirectusDocSummaryResponse = {
	data: {
		slug: string;
		updated_at?: string | null;
		translations: { title: string }[];
	}[];
};

type DirectusDocDetailsResponse = {
	data: {
		slug: string;
		updated_at?: string | null;
		translations: { title: string; content: string }[];
	}[];
};

const getPosts = createServerFn({ method: "GET" })
	.inputValidator(z.object({ locale: localeSchema }))
	.handler(async ({ data }) => {
		const locale = data.locale;
		const localeCode = getDirectusLocale(locale);
		const url = buildDirectusItemsUrl("blogposts", {
			"filter[application][_eq]": env.DIRECTUS_APPLICATION_ID,
			"filter[translations][languages_code][_eq]": localeCode,
			fields: "slug,illustration,translations.title,published_at",
			"deep[translations][_filter][languages_code][_eq]": localeCode,
			sort: "-published_at",
		});

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
					updatedAt: post.updated_at ?? null,
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
		const url = buildDirectusItemsUrl("blogposts", {
			"filter[application][_eq]": env.DIRECTUS_APPLICATION_ID,
			"filter[slug][_eq]": data.slug,
			"filter[translations][languages_code][_eq]": localeCode,
			fields:
				"slug,published_at,illustration,translations.title,translations.content",
			"deep[translations][_filter][languages_code][_eq]": localeCode,
		});

		const result = await safeApiCall(
			url,
			(d: DirectusBlogPostDetailsResponse) =>
				d.data.map((post) => ({
					slug: post.slug,
					publishedAt: post.published_at,
					publishedAtLabel: formatDate(post.published_at, data.locale),
					updatedAt: post.updated_at ?? null,
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
		const url = buildDirectusItemsUrl("documents", {
			"filter[application][_eq]": env.DIRECTUS_APPLICATION_ID,
			"filter[translations][languages_code][_eq]": localeCode,
			"deep[translations][_filter][languages_code][_eq]": localeCode,
			fields: "slug,translations.title",
		});

		const result = await safeApiCall(
			url,
			(d: DirectusDocSummaryResponse) =>
				d.data.map((doc) => ({
					slug: doc.slug,
					title: doc.translations[0]?.title || "",
					updatedAt: doc.updated_at ?? null,
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
		const url = buildDirectusItemsUrl("documents", {
			"filter[application][_eq]": env.DIRECTUS_APPLICATION_ID,
			"filter[slug][_eq]": data.slug,
			"filter[translations][languages_code][_eq]": localeCode,
			"deep[translations][_filter][languages_code][_eq]": localeCode,
			fields: "slug,translations.title,translations.content",
		});

		const result = await safeApiCall(
			url,
			(d: DirectusDocDetailsResponse) =>
				d.data.map((doc) => ({
					slug: doc.slug,
					title: doc.translations[0]?.title || "",
					content: doc.translations[0]?.content || "",
					updatedAt: doc.updated_at ?? null,
					updatedAtLabel: doc.updated_at
						? formatDate(doc.updated_at, data.locale)
						: "",
				}))[0],
			DocDetailsSchema,
		);

		return result;
	});

const getAssetUrl = createServerFn({ method: "GET" })
	.inputValidator(DirectusAssetInputSchema)
	.handler(({ data }) => {
		if (typeof data === "string") {
			return assetUrl(data);
		}

		const { assetId, ...options } = data;
		return assetUrl(assetId, options);
	});

export const directus = {
	getPosts,
	getPostDetails,
	getDocs,
	getDoc,
	getAssetUrl,
};
