import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	getCanonicalPageUrl,
	renderLlmsTxt,
} from "@/lib/ai-content";
import { directus } from "@/lib/directus";
import type { Locale } from "@/lib/i18n/locale";

const locales = ["fr-FR", "en-US"] satisfies Locale[];

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: async () => {
				const [postsByLocale, docsByLocale] = await Promise.all([
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
				]);

				return buildAgentContentResponse({
					body: renderLlmsTxt({ postsByLocale, docsByLocale }),
					canonicalUrl: getCanonicalPageUrl("/", "fr-FR"),
					format: "markdown",
				});
			},
		},
	},
});
