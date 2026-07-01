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
import { getBlogSeoOverride } from "@/lib/blog-seo";
import { HERO_PHOTO_ASSET_ID, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { directus, type PostDetails, type PostSummary } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
	buildArticleStructuredData,
	buildFaqStructuredData,
	buildSeo,
	type StructuredData,
	stripHtml,
	toExcerpt,
} from "@/lib/seo";

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
		const seoOverride = getBlogSeoOverride(
			loaderData.post.slug,
			loaderData.locale,
		);
		const title = seoOverride?.title ?? loaderData.post.title;
		const description =
			seoOverride?.description ??
			(contentText ? toExcerpt(contentText) : descriptionFallback);
		const path = `/blog/${loaderData.post.slug}`;
		const structuredData: StructuredData[] = [
			buildArticleStructuredData({
				title,
				description,
				path,
				locale: loaderData.locale,
				imageUrl: loaderData.post.imageUrl,
				publishedAt: loaderData.post.publishedAt,
			}),
		];

		if (seoOverride?.faq.length) {
			structuredData.push(buildFaqStructuredData(seoOverride.faq));
		}

		return buildSeo({
			title,
			description,
			path,
			locale: loaderData.locale,
			imageUrl: loaderData.post.imageUrl,
			type: "article",
			structuredData,
		});
	},
	pendingComponent: () => (
		<div className="terminal-page">
			<div className="mx-auto w-full max-w-4xl">
				<div className="flex flex-col gap-8 px-6 py-16">
					<Skeleton className="h-10 w-3/4 mx-auto" />
					<Skeleton className="w-full aspect-video" />
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
	const seoOverride = getBlogSeoOverride(post.slug, locale);
	const displayTitle = seoOverride?.title ?? post.title;

	useContentReadTracking({
		contentType: "blog",
		slug: post.slug,
		title: displayTitle,
		locale,
	});

	return (
		<div className="terminal-page">
			<article className="mx-auto w-full max-w-4xl">
				<div className="flex flex-col gap-8 px-6 py-16">
					<Link
						to="/{-$locale}/blog"
						params={localeParams}
						className="terminal-label hover:text-secondary"
					>
						{t((t) => t.blog.back)}
					</Link>
					<h1 className="terminal-heading text-center text-3xl md:text-5xl">
						{displayTitle}
					</h1>
					<p className="terminal-label text-center text-sm">
						{post.publishedAtLabel}
					</p>
					<div className="terminal-image-frame w-full aspect-video">
						<ArticleImage
							src={post.imageUrl}
							alt={displayTitle}
							className="terminal-image w-full h-full object-cover"
						/>
					</div>
					<MarkdownContent contentHtml={contentHtml} />
					{seoOverride ? <SeoInsightSection override={seoOverride} /> : null}
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
						<div className="terminal-divider mt-16 border-t pt-16">
							<h3 className="terminal-heading mb-8 text-center text-2xl">
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

function SeoInsightSection({
	override,
}: {
	override: NonNullable<ReturnType<typeof getBlogSeoOverride>>;
}) {
	const { locale } = useI18n();
	const labels =
		locale === "fr-FR"
			? { takeaways: "À retenir", faq: "FAQ rapide" }
			: { takeaways: "Key takeaways", faq: "Quick FAQ" };

	return (
		<section className="terminal-card mt-12 p-6">
			<p className="terminal-label">{labels.takeaways}</p>
			<p className="terminal-muted mt-3">{override.summary}</p>
			<ul className="terminal-muted mt-5 space-y-3 text-sm">
				{override.keyPoints.map((point) => (
					<li key={point} className="flex gap-3">
						<span className="mt-1.5 shrink-0 text-secondary">&gt;</span>
						<span>{point}</span>
					</li>
				))}
			</ul>
			<div className="mt-8 space-y-4">
				<h2 className="terminal-heading text-xl">{labels.faq}</h2>
				{override.faq.map((item) => (
					<div key={item.question} className="terminal-divider border-t pt-4">
						<h3 className="text-base font-semibold text-foreground">
							{item.question}
						</h3>
						<p className="terminal-muted mt-2 text-sm">{item.answer}</p>
					</div>
				))}
			</div>
		</section>
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
			<div className="terminal-card overflow-hidden">
				<div className="terminal-image-frame aspect-[16/10] border-0 shadow-none">
					<ArticleImage
						src={article.imageUrl}
						alt={article.title}
						className="terminal-image w-full h-full object-cover"
					/>
				</div>
				<div className="p-4 md:p-6">
					<div className="terminal-label mb-2">{article.publishedAtLabel}</div>
					<h4 className="terminal-heading text-base transition-colors group-hover:text-secondary md:text-lg line-clamp-2">
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
		<div className="terminal-page">
			<div className="py-24 px-6 max-w-5xl mx-auto text-center">
				<h1 className="mb-3 text-2xl font-semibold text-destructive md:text-3xl">
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
