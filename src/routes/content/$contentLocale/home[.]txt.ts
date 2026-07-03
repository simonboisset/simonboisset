import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	contentLocaleToLocale,
	getCanonicalPageUrl,
	renderHomeText,
} from "@/lib/ai-content";

export const Route = createFileRoute("/content/$contentLocale/home.txt")({
	server: {
		handlers: {
			GET: ({ params }) => {
				const locale = contentLocaleToLocale(params.contentLocale);
				if (!locale) return new Response("Not found", { status: 404 });

				return buildAgentContentResponse({
					body: renderHomeText(locale),
					canonicalUrl: getCanonicalPageUrl("/", locale),
					format: "text",
				});
			},
		},
	},
});
