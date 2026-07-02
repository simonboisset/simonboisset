import type { PostDetails, PostSummary } from "@/lib/directus";

export type DatedPost = Pick<
	PostSummary,
	"slug" | "publishedAt" | "publishedAtLabel" | "title" | "imageUrl"
>;

export const getClosestArticlesByDate = (
	currentPost: Pick<PostDetails, "slug" | "publishedAt">,
	allPosts: PostSummary[],
	count = 3,
): DatedPost[] => {
	const currentDate = toDateValue(currentPost.publishedAt);

	return allPosts
		.filter((post) => post.slug !== currentPost.slug)
		.map((post) => ({
			...post,
			dateDiff: Math.abs(toDateValue(post.publishedAt) - currentDate),
		}))
		.sort((a, b) => a.dateDiff - b.dateDiff)
		.slice(0, count);
};

const toDateValue = (value: string) => {
	const time = new Date(value).getTime();
	return Number.isNaN(time) ? 0 : time;
};
