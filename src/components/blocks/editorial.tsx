import { Link } from "@tanstack/react-router";
import type React from "react";
import { useEffect } from "react";
import { Card, cardVariants } from "@/components/ui/card";
import { ANALYTICS_EVENTS, useAnalytics } from "@/lib/analytics";
import type { DocSummary, PostSummary } from "@/lib/directus";
import { cn } from "@/lib/utils";

export type ArticleCardVariant = "featured" | "grid" | "compact";
export type ContentPlacement =
	| "blog_featured"
	| "blog_list"
	| "blog_suggested"
	| "docs_list";
export type DocumentCardVariant = "grid" | "compact";

type LocaleParams = Record<string, string>;

type ArticleCardPost = Pick<
	PostSummary,
	"slug" | "publishedAtLabel" | "title" | "imageUrl"
>;

export function ArticleImage({
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

export function ArticleCardLink({
	article,
	localeParams,
	placement,
	variant,
	featuredLabel,
}: {
	article: ArticleCardPost;
	localeParams: LocaleParams;
	placement: Extract<
		ContentPlacement,
		"blog_featured" | "blog_list" | "blog_suggested"
	>;
	variant: ArticleCardVariant;
	featuredLabel?: string;
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
					placement,
				})
			}
		>
			{variant === "featured" ? (
				<div className="flex flex-col md:flex-row gap-8 md:items-center">
					<div className="image-frame flex-1 aspect-[16/10]">
						<span className="image-frame-overlay" aria-hidden="true" />
						<ArticleImage
							src={article.imageUrl}
							alt={article.title}
							className="image-treated relative h-full w-full object-cover group-hover:scale-[1.025] group-hover:saturate-[0.95] group-hover:contrast-[1.28]"
						/>
					</div>
					<div className="flex-1">
						{featuredLabel ? (
							<p className="text-kicker">{featuredLabel}</p>
						) : null}
						<h2 className="text-heading mt-3 text-3xl transition-colors group-hover:text-secondary md:text-4xl">
							{article.title}
						</h2>
						<div className="text-kicker mt-4 text-sm">
							{article.publishedAtLabel}
						</div>
					</div>
				</div>
			) : (
				<Card showPin={false} className="overflow-hidden">
					<div className="image-frame aspect-[16/10] border-0 shadow-none">
						<span className="image-frame-overlay" aria-hidden="true" />
						<ArticleImage
							src={article.imageUrl}
							alt={article.title}
							className="image-treated relative h-full w-full object-cover group-hover:scale-[1.025] group-hover:saturate-[0.95] group-hover:contrast-[1.28]"
						/>
					</div>
					<div className={variant === "compact" ? "p-4 md:p-6" : "p-6"}>
						<div
							className={
								variant === "compact" ? "text-kicker mb-2" : "text-kicker mb-3"
							}
						>
							{article.publishedAtLabel}
						</div>
						<h4
							className={cn(
								"text-heading transition-colors group-hover:text-secondary line-clamp-2",
								variant === "compact" ? "text-base md:text-lg" : "text-lg",
							)}
						>
							{article.title}
						</h4>
					</div>
				</Card>
			)}
		</Link>
	);
}

export function DocumentCardLink({
	doc,
	localeParams,
	description,
	variant,
}: {
	doc: DocSummary;
	localeParams: LocaleParams;
	description?: string;
	variant: DocumentCardVariant;
}) {
	const { capture } = useAnalytics();
	const isCompact = variant === "compact";

	return (
		<Link
			to="/{-$locale}/docs/$slug"
			params={{ ...localeParams, slug: doc.slug }}
			className={cn(
				cardVariants(),
				"transition hover:no-underline",
				isCompact ? "p-6 text-sm" : "p-8",
			)}
			onClick={
				isCompact
					? undefined
					: () =>
							capture(ANALYTICS_EVENTS.contentClick, {
								content_type: "doc",
								slug: doc.slug,
								title: doc.title,
								placement: "docs_list",
							})
			}
		>
			{isCompact ? (
				doc.title
			) : (
				<>
					<h2 className="text-heading pr-8 text-xl">{doc.title}</h2>
					{description ? (
						<p className="text-body-muted mt-3 text-sm">{description}</p>
					) : null}
				</>
			)}
		</Link>
	);
}

export function ContentHero({
	label,
	title,
	description,
	children,
	containerClassName,
	titleClassName,
	descriptionClassName,
}: {
	label: string;
	title: string;
	description?: string;
	children?: React.ReactNode;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}) {
	return (
		<section className="section-hero">
			<div
				className={cn(
					"relative mx-auto w-full px-6 py-20 text-center",
					containerClassName,
				)}
			>
				<p className="text-kicker motion-safe:animate-boot-line">{label}</p>
				<h1
					className={cn(
						"text-heading motion-safe:animate-boot-line text-4xl md:text-5xl",
						titleClassName,
					)}
				>
					{title}
				</h1>
				{description ? (
					<p className={cn("text-body-muted text-lg", descriptionClassName)}>
						{description}
					</p>
				) : null}
				{children}
			</div>
		</section>
	);
}

export function ContentEmptyState({ children }: { children: React.ReactNode }) {
	return (
		<Card showPin={false} className="p-8 text-center">
			{children}
		</Card>
	);
}

export function ContentErrorState({
	error,
	title,
	fallback,
	source,
	containerClassName,
}: {
	error: Error;
	title: string;
	fallback: string;
	source: string;
	containerClassName?: string;
}) {
	const { captureException } = useAnalytics();

	useEffect(() => {
		captureException(error, {
			source,
		});
	}, [captureException, error, source]);

	return (
		<div
			className={cn(
				"mx-auto max-w-5xl px-6 py-24 text-center",
				containerClassName,
			)}
		>
			<h1 className="mb-3 text-2xl font-semibold text-destructive md:text-3xl">
				{title}
			</h1>
			<p className="text-muted-foreground">{error.message || fallback}</p>
		</div>
	);
}
