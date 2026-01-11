import { env } from "@/env";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Zod schemas for validation
const PostSummarySchema = z.object({
	slug: z.string(),
	illustration: z.string().nullable(),
	imageUrl: z.string().nullable(),
	title: z.string(),
	published_at: z.string(),
});

const PostDetailsSchema = z.object({
	slug: z.string(),
	published_at: z.string(),
	illustration: z.string().nullable(),
	imageUrl: z.string().nullable(),
	title: z.string(),
	content: z.string(),
});

export type PostSummary = z.infer<typeof PostSummarySchema>;
export type PostDetails = z.infer<typeof PostDetailsSchema>;

// Helper to build asset URLs
const assetUrl = (assetId: string | null): string | null => {
	if (!assetId) return null;
	return `${env.DIRECTUS_URL}/assets/${assetId}`;
};

// Safe API call wrapper with error handling
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

// Date formatter
const formatDate = (date: string): string => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

// Response types from Directus
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

// Fetch all published blog posts
const getPosts = createServerFn({ method: "GET" }).handler(async () => {
	const url = `${env.DIRECTUS_URL}/items/blogposts?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&filter[translations][languages_code][_eq]=en-US&fields=slug,illustration,translations.title,published_at&deep[translations][_filter][languages_code][_eq]=en-US&sort=-published_at`;

	const result = await safeApiCall(
		url,
		(d: DirectusBlogPostSummaryResponse) =>
			d.data.map((post) => ({
				slug: post.slug,
				illustration: post.illustration,
				imageUrl: assetUrl(post.illustration),
				title: post.translations[0]?.title || "",
				published_at: formatDate(post.published_at),
			})),
		z.array(PostSummarySchema),
	);
	return result || [];
});

// Fetch single blog post by slug
const getPostDetails = createServerFn({ method: "GET" })
	.inputValidator(z.string())
	.handler(async ({ data: slug }) => {
		const url = `${env.DIRECTUS_URL}/items/blogposts?filter[application][_eq]=${env.DIRECTUS_APPLICATION_ID}&fields=slug,published_at,illustration,translations.title,translations.content&filter[slug][_eq]=${slug}&deep[translations][_filter][languages_code][_eq]=en-US`;

		const result = await safeApiCall(
			url,
			(d: DirectusBlogPostDetailsResponse) =>
				d.data.map((post) => ({
					slug: post.slug,
					published_at: formatDate(post.published_at),
					illustration: post.illustration,
					imageUrl: assetUrl(post.illustration),
					title: post.translations[0]?.title || "",
					content: post.translations[0]?.content || "",
				}))[0],
			PostDetailsSchema,
		);

		return result;
	});

export const directus = {
	getPosts,
	getPostDetails,
};
