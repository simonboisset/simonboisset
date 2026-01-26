import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { marked } from "marked";
import { useEffect } from "react";
import { HeroIntroCard } from "@/components/blocks/HeroIntroCard";
import MarkdownContent from "@/components/blocks/MarkdownContent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	ANALYTICS_EVENTS,
	useAnalytics,
	useContentReadTracking,
} from "@/lib/analytics";
import { HERO_PHOTO_ASSET_ID, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { directus, type PostDetails, type PostSummary } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo, stripHtml, toExcerpt } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/blog/$slug")({
	component: BlogDetailPage,
	loader: async ({ params, location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const [post, posts, heroPhotoUrl] = await Promise.all([
			directus.getPostDetails({ data: { slug: params.slug, locale } }),
			directus.getPosts({ data: { locale } }),
			directus.getAssetUrl({ data: HERO_PHOTO_ASSET_ID }),
		]);

		if (!post) {
			throw notFound();
		}

		const contentHtml = await marked.parse(post.content);

		return { post, contentHtml, posts, locale, heroPhotoUrl };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		const descriptionFallback = t((t) => t.blog.description);
		const contentText = stripHtml(loaderData.contentHtml);
		const description = contentText
			? toExcerpt(contentText)
			: descriptionFallback;

		return buildSeo({
			title: loaderData.post.title,
			description,
			path: `/blog/${loaderData.post.slug}`,
			locale: loaderData.locale,
			imageUrl: loaderData.post.imageUrl,
			type: "article",
		});
	},
	pendingComponent: () => (
		<div className="bg-[#f6f1ea]">
			<div className="mx-auto w-full max-w-4xl">
				<div className="flex flex-col gap-8 px-6 py-16">
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
	errorComponent: ({ error }) => <BlogPostError error={error} />,
});

function BlogDetailPage() {
	const { post, contentHtml, posts, heroPhotoUrl } = Route.useLoaderData();
	const { t, locale, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const suggestedArticles = getClosestArticlesByDate(post, posts, 3);

	useContentReadTracking({
		contentType: "blog",
		slug: post.slug,
		title: post.title,
		locale,
	});

	return (
		<div className="bg-[#f6f1ea]">
			<article className="mx-auto w-full max-w-4xl">
				<div className="flex flex-col gap-8 px-6 py-16">
					<Link
						to="/{-$locale}/blog"
						params={localeParams}
						className="text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900"
					>
						{t((t) => t.blog.back)}
					</Link>
					<h1 className="text-3xl md:text-5xl font-semibold text-slate-900 text-center">
						{post.title}
					</h1>
					<p className="text-center text-sm uppercase tracking-[0.2em] text-slate-500">
						{post.publishedAtLabel}
					</p>
					<div className="w-full aspect-video overflow-hidden rounded-2xl shadow-lg bg-white">
						<ArticleImage
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>
					<MarkdownContent contentHtml={contentHtml} />
					<div className="mt-16 space-y-4">
						<HeroIntroCard
							heroPhotoUrl={heroPhotoUrl}
							intro={t((t) => t.home.hero.intro)}
							alt={t((t) => t.nav.brand)}
						/>
						<Button asChild>
							<a
								href={SCHEDULE_VISIO_URL}
								target="_blank"
								rel="noreferrer"
								onClick={() =>
									capture(ANALYTICS_EVENTS.ctaClick, {
										cta: "schedule_call",
										placement: "blog_post",
										href: SCHEDULE_VISIO_URL,
									})
								}
							>
								{t((t) => t.blog.bookCtaButton)}
								<ArrowUpRight className="size-4" />
							</a>
						</Button>
					</div>

					{suggestedArticles.length > 0 ? (
						<div className="mt-16 pt-16 border-t border-slate-200">
							<h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
								{t((t) => t.blog.other)}
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
								{suggestedArticles.map((article) => (
									<SuggestedArticleCard
										key={article.slug}
										article={article}
										localeParams={localeParams}
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

type DatedPost = Pick<
	PostSummary,
	"slug" | "publishedAt" | "publishedAtLabel" | "title" | "imageUrl"
>;

const getClosestArticlesByDate = (
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

function SuggestedArticleCard({
	article,
	localeParams,
}: {
	article: DatedPost;
	localeParams: Record<string, string>;
}) {
	const { capture } = useAnalytics();

	return (
		<Link
			to="/{-$locale}/blog/$slug"
			params={{ ...localeParams, slug: article.slug }}
			className="block group hover:no-underline"
			onClick={() =>
				capture(ANALYTICS_EVENTS.contentClick, {
					content_type: "blog",
					slug: article.slug,
					title: article.title,
					placement: "blog_suggested",
				})
			}
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
						{article.publishedAtLabel}
					</div>
					<h4 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
						{article.title}
					</h4>
				</div>
			</div>
		</Link>
	);
}

function BlogPostError({ error }: { error: Error }) {
	const { t } = useI18n();
	const { captureException } = useAnalytics();

	useEffect(() => {
		captureException(error, {
			source: "blog_detail",
		});
	}, [captureException, error]);

	return (
		<div className="bg-[#f6f1ea]">
			<div className="py-24 px-6 max-w-5xl mx-auto text-center">
				<h1 className="text-2xl md:text-3xl font-semibold text-red-600 mb-3">
					{t((t) => t.blog.errorTitleDetail)}
				</h1>
				<p className="text-muted-foreground">
					{error.message || t((t) => t.blog.errorFallback)}
				</p>
			</div>
		</div>
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
