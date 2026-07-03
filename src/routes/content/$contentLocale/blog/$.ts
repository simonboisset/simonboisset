import { createFileRoute } from "@tanstack/react-router";
import {
	buildAgentContentResponse,
	contentLocaleToLocale,
	getCanonicalPageUrl,
	renderPostMarkdown,
	renderPostText,
} from "@/lib/ai-content";
import { directus } from "@/lib/directus";

export const Route = createFileRoute("/content/$contentLocale/blog/$")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const locale = contentLocaleToLocale(params.contentLocale);
				const parsedPath = parseAgentReadablePath(params._splat);
				if (!locale || !parsedPath)
					return new Response("Not found", { status: 404 });

				const post = await directus.getPostDetails({
					data: { slug: parsedPath.slug, locale },
				});

				if (!post) return new Response("Not found", { status: 404 });

				return buildAgentContentResponse({
					body:
						parsedPath.format === "markdown"
							? renderPostMarkdown(post, locale)
							: renderPostText(post, locale),
					canonicalUrl: getCanonicalPageUrl(`/blog/${post.slug}`, locale),
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
