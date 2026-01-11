import { Skeleton } from "@/components/ui/skeleton";
import { directus, type PostDetails, type PostSummary } from "@/lib/directus";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";

export const Route = createFileRoute("/blog/$slug")({
	component: BlogDetailPage,
	loader: async ({ params }) => {
		const [post, posts] = await Promise.all([
			directus.getPostDetails({ data: params.slug }),
			directus.getPosts(),
		]);

		if (!post) {
			throw notFound();
		}

		const contentHtml = await marked.parse(post.content);

		return { post, contentHtml, posts };
	},
	pendingComponent: () => (
		<div className="bg-white">
			<div className="max-w-4xl mx-auto my-24">
				<div className="py-16 md:py-24 px-4 md:px-8 flex flex-col gap-8">
					<Skeleton className="h-10 w-3/4 mx-auto" />
					<Skeleton className="w-full aspect-video rounded-lg" />
					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
				</div>
			</div>
		</div>
	),
	errorComponent: ({ error }) => (
		<div className="bg-white">
			<div className="py-24 md:py-32 px-4 md:px-8 max-w-5xl mx-auto text-center">
				<h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-3">
					Error Loading Post
				</h1>
				<p className="text-muted-foreground">
					{error.message || "An unexpected error occurred"}
				</p>
			</div>
		</div>
	),
});

function BlogDetailPage() {
	const { post, contentHtml, posts } = Route.useLoaderData();
	const suggestedArticles = getClosestArticlesByDate(post, posts, 3);

	return (
		<div className="bg-white">
			<article className="max-w-4xl mx-auto my-24">
				<div className="py-16 md:py-24 px-4 md:px-8 flex flex-col gap-8">
					<h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-8">
						{post.title}
					</h1>
					<div className="w-full aspect-video overflow-hidden rounded-lg shadow-lg bg-muted">
						<ArticleImage
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>
					<MarkdownContent contentHtml={contentHtml} />

					{suggestedArticles.length > 0 ? (
						<div className="mt-16 pt-16 border-t border-gray-200">
							<h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
								Other articles
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
								{suggestedArticles.map((article) => (
									<SuggestedArticleCard
										key={article.slug}
										article={article}
									/>
								))}
							</div>
						</div>
					) : null}
				</div>
			</article>
		</div>
	);
}

function MarkdownContent({ contentHtml }: { contentHtml: string }) {
	return (
		<div
			className={
				"prose mx-auto text-gray-600 prose-headings:text-gray-700 " +
				"prose-p:text-justify prose-a:underline prose-a:font-bold " +
				"prose-img:rounded-lg prose-img:shadow-lg prose-img:object-cover"
			}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
}

type DatedPost = Pick<PostSummary, "slug" | "published_at" | "title" | "imageUrl">;

const getClosestArticlesByDate = (
	currentPost: Pick<PostDetails, "slug" | "published_at">,
	allPosts: PostSummary[],
	count = 3,
): DatedPost[] => {
	const currentDate = toDateValue(currentPost.published_at);

	return allPosts
		.filter((post) => post.slug !== currentPost.slug)
		.map((post) => ({
			...post,
			dateDiff: Math.abs(toDateValue(post.published_at) - currentDate),
		}))
		.sort((a, b) => a.dateDiff - b.dateDiff)
		.slice(0, count);
};

const toDateValue = (value: string) => {
	const time = new Date(value).getTime();
	return Number.isNaN(time) ? 0 : time;
};

function SuggestedArticleCard({ article }: { article: DatedPost }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: article.slug }}
			className="block group hover:no-underline"
		>
			<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
				<div className="aspect-[16/10] overflow-hidden bg-muted">
					<ArticleImage
						src={article.imageUrl}
						alt={article.title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				</div>
				<div className="p-4 md:p-6">
					<div className="text-sm text-gray-500 mb-2">
						{article.published_at}
					</div>
					<h4 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
						{article.title}
					</h4>
				</div>
			</div>
		</Link>
	);
}

function ArticleImage({
	src,
	alt,
	className,
}: {
	src: string | null;
	alt: string;
	className: string;
}) {
	if (!src) {
		return <div className={`${className} bg-muted`} aria-hidden="true" />;
	}

	return <img src={src} alt={alt} className={className} />;
}
