import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	getCanonicalPageUrl,
	renderLlmsFullMarkdown,
} from "@/lib/ai-content";
import { directus } from "@/lib/directus";
import type { Locale } from "@/lib/i18n/locale";

const locales = ["fr-FR", "en-US"] satisfies Locale[];

export const Route = createFileRoute("/llms-full.txt")({
	server: {
		handlers: {
			GET: async () => {
				const [postSummariesByLocale, docSummariesByLocale] = await Promise.all(
					[
						Promise.all(
							locales.map(async (locale) => ({
								locale,
								items: await directus.getPosts({ data: { locale } }),
							})),
						),
						Promise.all(
							locales.map(async (locale) => ({
								locale,
								items: await directus.getDocs({ data: { locale } }),
							})),
						),
					],
				);

				const [postsByLocale, docsByLocale] = await Promise.all([
					Promise.all(
						postSummariesByLocale.map(async ({ locale, items }) => ({
							locale,
							items: (
								await Promise.all(
									items.map((post) =>
										directus.getPostDetails({
											data: { slug: post.slug, locale },
										}),
									),
								)
							).filter((post) => post !== null),
						})),
					),
					Promise.all(
						docSummariesByLocale.map(async ({ locale, items }) => ({
							locale,
							items: (
								await Promise.all(
									items.map((doc) =>
										directus.getDoc({
											data: { slug: doc.slug, locale },
										}),
									),
								)
							).filter((doc) => doc !== null),
						})),
					),
				]);

				return buildAgentContentResponse({
					body: renderLlmsFullMarkdown({ postsByLocale, docsByLocale }),
					canonicalUrl: getCanonicalPageUrl("/", "fr-FR"),
					format: "markdown",
				});
			},
		},
	},
});
