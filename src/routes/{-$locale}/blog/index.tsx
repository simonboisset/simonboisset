import { createFileRoute } from "@tanstack/react-router";
import {
	ArticleCardLink,
	ContentEmptyState,
	ContentErrorState,
	ContentHero,
} from "@/components/blocks/editorial";
import { Skeleton } from "@/components/ui/skeleton";
import { directus, type PostSummary } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/blog/")({
	component: BlogListPage,
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const posts = await directus.getPosts({ data: { locale } });
		return { posts, locale };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.seo.blogTitle),
			description: t((t) => t.blog.description),
			path: "/blog",
			locale: loaderData.locale,
		});
	},
	pendingComponent: () => (
		<div className="py-24 md:py-28 px-6 max-w-6xl mx-auto">
			<div className="text-center mb-16">
				<Skeleton className="h-10 w-32 mx-auto mb-4" />
				<Skeleton className="h-5 w-80 mx-auto" />
			</div>
			<div className="mb-16">
				<div className="flex flex-col md:flex-row gap-8 md:items-center">
					<Skeleton className="flex-1 aspect-[16/10]" />
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
						<div key={i} className="overflow-hidden rounded-lg">
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
	),
	errorComponent: ({ error }) => <BlogError error={error} />,
});

function BlogListPage() {
	const { posts } = Route.useLoaderData();
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const [featuredArticle, ...otherArticles] = posts;

	return (
		<>
			<ContentHero
				label={t((t) => t.blog.heroLabel)}
				title={t((t) => t.blog.heroTitle)}
				description={t((t) => t.blog.description)}
				containerClassName="flex max-w-6xl flex-col gap-6"
				descriptionClassName="mx-auto max-w-2xl"
			/>

			<section className="section-divider mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
				{posts.length === 0 ? (
					<ContentEmptyState>{t((t) => t.blog.empty)}</ContentEmptyState>
				) : (
					<>
						{featuredArticle ? (
							<div className="mb-16">
								<ArticleCardLink
									article={featuredArticle}
									localeParams={localeParams}
									placement="blog_featured"
									variant="featured"
									featuredLabel={t((t) => t.blog.featured)}
								/>
							</div>
						) : null}

						{otherArticles.length > 0 ? (
							<div>
								<h3 className="text-heading mb-8 text-2xl">
									{t((t) => t.blog.latest)}
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{otherArticles.map((article: PostSummary) => (
										<ArticleCard
											key={article.slug}
											article={article}
											localeParams={localeParams}
										/>
									))}
								</div>
							</div>
						) : null}
					</>
				)}
			</section>
		</>
	);
}

function BlogError({ error }: { error: Error }) {
	const { t } = useI18n();

	return (
		<ContentErrorState
			error={error}
			title={t((t) => t.blog.errorTitleList)}
			fallback={t((t) => t.blog.errorFallback)}
			source="blog_list"
			containerClassName="md:py-28"
		/>
	);
}

function ArticleCard({
	article,
	localeParams,
}: {
	article: PostSummary;
	localeParams: Record<string, string>;
}) {
	return (
		<ArticleCardLink
			article={article}
			localeParams={localeParams}
			placement="blog_list"
			variant="grid"
		/>
	);
}
