import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { marked } from "marked";
import {
	ArticleCardLink,
	ArticleImage,
	ContentErrorState,
} from "@/components/blocks/editorial";
import { HeroIntroCard } from "@/components/blocks/HeroIntroCard";
import MarkdownContent from "@/components/blocks/MarkdownContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	ANALYTICS_EVENTS,
	useAnalytics,
	useContentReadTracking,
} from "@/lib/analytics";
import { type DatedPost, getClosestArticlesByDate } from "@/lib/blog";
import { getBlogSeoOverride } from "@/lib/blog-seo";
import { HERO_PHOTO_ASSET_ID, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { directus } from "@/lib/directus";
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
		<article className="mx-auto w-full max-w-4xl">
			<div className="flex flex-col gap-8 px-6 py-16">
				<Link
					to="/{-$locale}/blog"
					params={localeParams}
					className="text-kicker hover:text-secondary"
				>
					{t((t) => t.blog.back)}
				</Link>
				<h1 className="text-heading text-center text-3xl md:text-5xl">
					{displayTitle}
				</h1>
				<p className="text-kicker text-center text-sm">
					{post.publishedAtLabel}
				</p>
				<div className="image-frame w-full aspect-video">
					<span className="image-frame-overlay" aria-hidden="true" />
					<ArticleImage
						src={post.imageUrl}
						alt={displayTitle}
						className="image-treated relative h-full w-full object-cover"
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
					<div className="mt-16 border-t border-secondary/25 pt-16">
						<h3 className="text-heading mb-8 text-center text-2xl">
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
		<Card showPin={false} className="mt-12 p-6">
			<p className="text-kicker">{labels.takeaways}</p>
			<p className="text-body-muted mt-3">{override.summary}</p>
			<ul className="text-body-muted mt-5 space-y-3 text-sm">
				{override.keyPoints.map((point) => (
					<li key={point} className="flex gap-3">
						<span className="mt-1.5 shrink-0 text-secondary">&gt;</span>
						<span>{point}</span>
					</li>
				))}
			</ul>
			<div className="mt-8 space-y-4">
				<h2 className="text-heading text-xl">{labels.faq}</h2>
				{override.faq.map((item) => (
					<div
						key={item.question}
						className="border-t border-secondary/25 pt-4"
					>
						<h3 className="text-base font-semibold text-foreground">
							{item.question}
						</h3>
						<p className="text-body-muted mt-2 text-sm">{item.answer}</p>
					</div>
				))}
			</div>
		</Card>
	);
}

function SuggestedArticleCard({
	article,
	localeParams,
}: {
	article: DatedPost;
	localeParams: Record<string, string>;
}) {
	return (
		<ArticleCardLink
			article={article}
			localeParams={localeParams}
			placement="blog_suggested"
			variant="compact"
		/>
	);
}

function BlogPostError({ error }: { error: Error }) {
	const { t } = useI18n();

	return (
		<ContentErrorState
			error={error}
			title={t((t) => t.blog.errorTitleDetail)}
			fallback={t((t) => t.blog.errorFallback)}
			source="blog_detail"
		/>
	);
}
