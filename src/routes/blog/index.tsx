import { Skeleton } from "@/components/ui/skeleton";
import { directus, type PostSummary } from "@/lib/directus";
import { createFileRoute, Link } from "@tanstack/react-router";

const blogDescription = "Product updates, guides, and stories from the team.";

export const Route = createFileRoute("/blog/")({
	ssr: false,
	component: BlogListPage,
	loader: () => directus.getPosts(),
	pendingComponent: () => (
		<div className="bg-white">
			<div className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<Skeleton className="h-10 w-36 mx-auto mb-4" />
					<Skeleton className="h-5 w-96 mx-auto" />
				</div>
				<div className="mb-16">
					<div className="flex flex-col md:flex-row gap-8 md:items-center">
						<Skeleton className="flex-1 aspect-[16/10] rounded-2xl" />
						<div className="flex-1">
							<Skeleton className="h-10 w-3/4 mb-4" />
							<Skeleton className="h-4 w-40" />
						</div>
					</div>
				</div>
				<div>
					<Skeleton className="h-7 w-52 mb-8" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="rounded-xl overflow-hidden">
								<Skeleton className="aspect-[16/10] w-full" />
								<div className="p-6">
									<Skeleton className="h-4 w-28 mb-3" />
									<Skeleton className="h-5 w-3/4" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	),
	errorComponent: ({ error }) => (
		<div className="bg-white">
			<div className="py-24 md:py-32 px-4 md:px-8 max-w-5xl mx-auto text-center">
				<h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-3">
					Error Loading Blog
				</h1>
				<p className="text-muted-foreground">
					{error.message || "An unexpected error occurred"}
				</p>
			</div>
		</div>
	),
});

function BlogListPage() {
	const posts = Route.useLoaderData();
	const [featuredArticle, ...otherArticles] = posts;

	return (
		<div className="bg-white">
			<div className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						{blogDescription}
					</p>
				</div>

				{posts.length === 0 ? (
					<p className="text-center text-muted-foreground">
						No blog posts published yet.
					</p>
				) : (
					<>
						{featuredArticle ? (
							<div className="mb-16">
								<Link
									to="/blog/$slug"
									params={{ slug: featuredArticle.slug }}
									className="block group hover:no-underline"
								>
									<div className="flex flex-col md:flex-row gap-8 md:items-center">
										<div className="flex-1 aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
											<ArticleImage
												src={featuredArticle.imageUrl}
												alt={featuredArticle.title}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
											/>
										</div>
										<div className="flex-1">
											<h2 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-4">
												{featuredArticle.title}
											</h2>
											<div className="text-lg text-gray-500">
												{featuredArticle.published_at}
											</div>
										</div>
									</div>
								</Link>
							</div>
						) : null}

						{otherArticles.length > 0 ? (
							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-8">
									Other articles
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{otherArticles.map((article) => (
										<ArticleCard key={article.slug} article={article} />
									))}
								</div>
							</div>
						) : null}
					</>
				)}
			</div>
		</div>
	);
}

function ArticleCard({ article }: { article: PostSummary }) {
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
				<div className="p-6">
					<div className="text-sm text-gray-500 mb-2">
						{article.published_at}
					</div>
					<h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
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
