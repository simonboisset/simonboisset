import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	contentLocaleToLocale,
	getCanonicalPageUrl,
	renderHomeMarkdown,
} from "@/lib/ai-content";

export const Route = createFileRoute("/content/$contentLocale/home.md")({
	server: {
		handlers: {
			GET: ({ params }) => {
				const locale = contentLocaleToLocale(params.contentLocale);
				if (!locale) return new Response("Not found", { status: 404 });

				return buildAgentContentResponse({
					body: renderHomeMarkdown(locale),
					canonicalUrl: getCanonicalPageUrl("/", locale),
					format: "markdown",
				});
			},
		},
	},
});
