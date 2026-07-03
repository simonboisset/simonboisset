import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	contentLocaleToLocale,
	getCanonicalPageUrl,
	renderDocMarkdown,
	renderDocText,
} from "@/lib/ai-content";
import { directus } from "@/lib/directus";

export const Route = createFileRoute("/content/$contentLocale/docs/$")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const locale = contentLocaleToLocale(params.contentLocale);
				const parsedPath = parseAgentReadablePath(params._splat);
				if (!locale || !parsedPath)
					return new Response("Not found", { status: 404 });

				const doc = await directus.getDoc({
					data: { slug: parsedPath.slug, locale },
				});

				if (!doc) return new Response("Not found", { status: 404 });

				return buildAgentContentResponse({
					body:
						parsedPath.format === "markdown"
							? renderDocMarkdown(doc, locale)
							: renderDocText(doc, locale),
					canonicalUrl: getCanonicalPageUrl(`/docs/${doc.slug}`, locale),
					format: parsedPath.format,
				});
			},
		},
	},
});

function parseAgentReadablePath(
	path: string | undefined,
): { slug: string; format: "markdown" | "text" } | null {
	if (!path) return null;
	if (path.endsWith(".md")) {
		return { slug: path.slice(0, -".md".length), format: "markdown" };
	}
	if (path.endsWith(".txt")) {
		return { slug: path.slice(0, -".txt".length), format: "text" };
	}
	return null;
}
