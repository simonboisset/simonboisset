import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
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
					<div className="terminal-image-frame flex-1 aspect-[16/10]">
						<ArticleImage
							src={article.imageUrl}
							alt={article.title}
							className="terminal-image w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1">
						{featuredLabel ? (
							<p className="terminal-label">{featuredLabel}</p>
						) : null}
						<h2 className="terminal-heading mt-3 text-3xl transition-colors group-hover:text-secondary md:text-4xl">
							{article.title}
						</h2>
						<div className="terminal-label mt-4 text-sm">
							{article.publishedAtLabel}
						</div>
					</div>
				</div>
			) : (
				<div className="terminal-card overflow-hidden">
					<div className="terminal-image-frame aspect-[16/10] border-0 shadow-none">
						<ArticleImage
							src={article.imageUrl}
							alt={article.title}
							className="terminal-image w-full h-full object-cover"
						/>
					</div>
					<div className={variant === "compact" ? "p-4 md:p-6" : "p-6"}>
						<div
							className={
								variant === "compact"
									? "terminal-label mb-2"
									: "terminal-label mb-3"
							}
						>
							{article.publishedAtLabel}
						</div>
						<h4
							className={cn(
								"terminal-heading transition-colors group-hover:text-secondary line-clamp-2",
								variant === "compact" ? "text-base md:text-lg" : "text-lg",
							)}
						>
							{article.title}
						</h4>
					</div>
				</div>
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
			className={
				isCompact
					? "terminal-card p-6 text-sm transition hover:no-underline"
					: "terminal-card p-8 transition hover:no-underline"
			}
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
					<h2 className="terminal-heading pr-8 text-xl">{doc.title}</h2>
					{description ? (
						<p className="terminal-muted mt-3 text-sm">{description}</p>
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
		<section className="terminal-hero">
			<div
				className={cn(
					"relative mx-auto w-full px-6 py-20 text-center",
					containerClassName,
				)}
			>
				<p className="terminal-label terminal-boot-line">{label}</p>
				<h1
					className={cn(
						"terminal-heading terminal-boot-line text-4xl md:text-5xl",
						titleClassName,
					)}
				>
					{title}
				</h1>
				{description ? (
					<p className={cn("terminal-muted text-lg", descriptionClassName)}>
						{description}
					</p>
				) : null}
				{children}
			</div>
		</section>
	);
}

export function ContentEmptyState({ children }: { children: React.ReactNode }) {
	return <p className="terminal-card p-8 text-center">{children}</p>;
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
		<div className="terminal-page">
			<div
				className={cn(
					"py-24 px-6 max-w-5xl mx-auto text-center",
					containerClassName,
				)}
			>
				<h1 className="mb-3 text-2xl font-semibold text-destructive md:text-3xl">
					{title}
				</h1>
				<p className="text-muted-foreground">{error.message || fallback}</p>
			</div>
		</div>
	);
}
