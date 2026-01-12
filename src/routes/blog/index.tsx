import { Skeleton } from "@/components/ui/skeleton";
import { directus, type PostSummary } from "@/lib/directus";
import { createFileRoute, Link } from "@tanstack/react-router";

const blogDescription =
	"Field notes on mobile delivery, Expo workflows, and full-stack craft.";

export const Route = createFileRoute("/blog/")({
	ssr: false,
	component: BlogListPage,
	loader: () => directus.getPosts(),
	pendingComponent: () => (
		<div className="bg-[#f6f1ea]">
			<div className="py-24 md:py-28 px-6 max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<Skeleton className="h-10 w-32 mx-auto mb-4" />
					<Skeleton className="h-5 w-80 mx-auto" />
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
					<Skeleton className="h-7 w-40 mb-8" />
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
		<div className="bg-[#f6f1ea]">
			<div className="py-24 md:py-28 px-6 max-w-5xl mx-auto text-center">
				<h1 className="text-2xl md:text-3xl font-semibold text-red-600 mb-3">
					Error loading blog
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
		<div className="bg-[#f6f1ea]">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Blog
					</p>
					<h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
						Thoughts on shipping great mobile products.
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-slate-600">
						{blogDescription}
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-6xl px-6 pb-20">
				{posts.length === 0 ? (
					<p className="rounded-2xl border border-slate-200 bg-white/80 p-8 text-center text-slate-600">
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
										<div className="flex-1 aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-sm">
											<ArticleImage
												src={featuredArticle.imageUrl}
												alt={featuredArticle.title}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
											/>
										</div>
										<div className="flex-1">
											<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
												Featured
											</p>
											<h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
												{featuredArticle.title}
											</h2>
											<div className="mt-4 text-sm text-slate-500">
												{featuredArticle.published_at}
											</div>
										</div>
									</div>
								</Link>
							</div>
						) : null}

						{otherArticles.length > 0 ? (
							<div>
								<h3 className="text-2xl font-semibold text-slate-900 mb-8">
									Latest articles
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
			</section>
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
			<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
				<div className="aspect-[16/10] overflow-hidden bg-slate-100">
					<ArticleImage
						src={article.imageUrl}
						alt={article.title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				</div>
				<div className="p-6">
					<div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
						{article.published_at}
					</div>
					<h4 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
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
