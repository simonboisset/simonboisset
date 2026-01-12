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
		<div className="bg-[#f6f1ea]">
			<div className="max-w-4xl mx-auto my-20">
				<div className="py-16 px-6 flex flex-col gap-8">
					<Skeleton className="h-10 w-3/4 mx-auto" />
					<Skeleton className="w-full aspect-video rounded-2xl" />
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
		<div className="bg-[#f6f1ea]">
			<div className="py-24 px-6 max-w-5xl mx-auto text-center">
				<h1 className="text-2xl md:text-3xl font-semibold text-red-600 mb-3">
					Error loading post
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
		<div className="bg-[#f6f1ea]">
			<article className="max-w-4xl mx-auto my-20">
				<div className="py-16 px-6 flex flex-col gap-8">
					<Link
						to="/blog"
						className="text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900"
					>
						Back to blog
					</Link>
					<h1 className="text-3xl md:text-5xl font-semibold text-slate-900 text-center">
						{post.title}
					</h1>
					<p className="text-center text-sm uppercase tracking-[0.2em] text-slate-500">
						{post.published_at}
					</p>
					<div className="w-full aspect-video overflow-hidden rounded-2xl shadow-lg bg-white">
						<ArticleImage
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>
					<MarkdownContent contentHtml={contentHtml} />

					{suggestedArticles.length > 0 ? (
						<div className="mt-16 pt-16 border-t border-slate-200">
							<h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
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
				"prose mx-auto max-w-none text-slate-700 prose-headings:text-slate-900 " +
				"prose-p:leading-relaxed prose-a:text-teal-700 prose-a:font-semibold " +
				"prose-img:rounded-2xl prose-img:shadow-lg prose-img:object-cover"
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
			<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
				<div className="aspect-[16/10] overflow-hidden bg-slate-100">
					<ArticleImage
						src={article.imageUrl}
						alt={article.title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				</div>
				<div className="p-4 md:p-6">
					<div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
						{article.published_at}
					</div>
					<h4 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
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
