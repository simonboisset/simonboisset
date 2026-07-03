import { describe, expect, it, vi } from "vitest";
import { getClosestArticlesByDate } from "@/lib/blog";
import type { PostDetails, PostSummary } from "@/lib/directus";

const post = (slug: string, publishedAt: string): PostSummary => ({
	slug,
	publishedAt,
	publishedAtLabel: publishedAt,
	title: slug,
	illustration: null,
	imageUrl: null,
});

describe("blog helpers", () => {
	it("returns closest articles by date and skips the current post", () => {
		const currentPost = {
			slug: "current",
			publishedAt: "2026-01-10",
		} satisfies Pick<PostDetails, "slug" | "publishedAt">;

		const result = getClosestArticlesByDate(
			currentPost,
			[
				post("older", "2026-01-01"),
				post("near-after", "2026-01-12"),
				post("current", "2026-01-10"),
				post("near-before", "2026-01-09"),
			],
			2,
		);

		expect(result.map((article) => article.slug)).toEqual([
			"near-before",
			"near-after",
		]);
	});

	it("builds Directus blog URLs with public-safe locale filters", async () => {
		vi.resetModules();
		vi.stubEnv("DIRECTUS_URL", "https://cms.example.com");
		vi.stubEnv("DIRECTUS_APPLICATION_ID", "app-id");
		vi.stubEnv("KEYSTONE_APPLICATION_ID", "keystone-id");
		vi.stubEnv("DIRECTUS_WAITLIST_TOKEN", "waitlist-token");

		const { buildDirectusItemsUrl } = await import("@/lib/directus");
		const url = new URL(
			buildDirectusItemsUrl("blogposts", {
				"filter[application][_eq]": "app-id",
				"filter[translations][languages_code][_eq]": "fr-FR",
				fields: "slug,translations.title,published_at",
			}),
		);

		expect(url.origin).toBe("https://cms.example.com");
		expect(url.pathname).toBe("/items/blogposts");
		expect(url.searchParams.get("filter[application][_eq]")).toBe("app-id");
		expect(url.searchParams.has("filter[status][_eq]")).toBe(false);
		expect(
			url.searchParams.get("filter[translations][languages_code][_eq]"),
		).toBe("fr-FR");
		expect(url.searchParams.get("fields")).toBe(
			"slug,translations.title,published_at",
		);

		vi.unstubAllEnvs();
	});
});
