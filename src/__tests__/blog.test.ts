import { describe, expect, it } from "vitest";
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
});
