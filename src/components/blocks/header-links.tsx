import { Link } from "@tanstack/react-router";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/components/ui/card";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { PostSummary } from "@/lib/directus";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

type HeaderMenuLinkProps = {
	title: string;
	description: string;
	to: string;
	params: Record<string, string>;
	icon?: React.ReactNode;
	hash?: string;
	className?: string;
};

export function HeaderMenuLink({
	title,
	description,
	to,
	params,
	icon,
	hash,
	className,
}: HeaderMenuLinkProps) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to={to}
					params={params}
					hash={hash}
					className={cn(
						cardVariants(),
						"group flex h-full flex-col gap-2 p-3 text-sm hover:no-underline",
						className,
					)}
				>
					{icon ? (
						<span className="flex items-center gap-3">
							<Badge className="flex h-12 w-12 items-center justify-center p-0">
								{icon}
							</Badge>
							<span className="flex min-h-12 flex-col justify-center">
								<span className="text-sm font-semibold text-foreground group-hover:text-secondary">
									{title}
								</span>
								<span className="text-body-muted text-xs line-clamp-2">
									{description}
								</span>
							</span>
						</span>
					) : (
						<>
							<span className="text-sm font-semibold text-foreground group-hover:text-secondary">
								{title}
							</span>
							<span className="text-body-muted text-xs line-clamp-3">
								{description}
							</span>
						</>
					)}
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

type HeaderMenuExternalLinkProps = {
	title: string;
	description: string;
	href: string;
	icon?: React.ReactNode;
	className?: string;
	variant?: "default" | "brand";
	onClick?: () => void;
};

export function HeaderMenuExternalLink({
	title,
	description,
	href,
	icon,
	className,
	variant = "default",
	onClick,
}: HeaderMenuExternalLinkProps) {
	const isBrand = variant === "brand";

	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					onClick={onClick}
					className={cn(
						cardVariants(),
						"group flex h-full items-start gap-3 p-3 text-sm transition hover:no-underline",
						isBrand
							? "border-foreground bg-[#24292f] text-white hover:bg-[#1f2328]"
							: "",
						className,
					)}
				>
					{icon ? (
						<span
							className={cn(
								"mt-0.5 rounded-md p-1",
								isBrand
									? "bg-white/10 text-white"
									: "bg-secondary text-secondary-foreground",
							)}
						>
							{icon}
						</span>
					) : null}
					<span className="flex flex-col gap-2">
						<span
							className={cn(
								"text-sm font-semibold",
								isBrand
									? "text-white"
									: "text-foreground group-hover:text-secondary",
							)}
						>
							{title}
						</span>
						<span
							className={cn(
								"text-xs line-clamp-3",
								isBrand ? "text-foreground/80" : "text-body-muted",
							)}
						>
							{description}
						</span>
					</span>
				</a>
			</NavigationMenuLink>
		</li>
	);
}

export function HeaderBlogPreviewLink({
	post,
	localeParams,
}: {
	post: PostSummary;
	localeParams: Record<string, string>;
}) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to="/{-$locale}/blog/$slug"
					params={{ ...localeParams, slug: post.slug }}
					className={cn(
						cardVariants(),
						"group flex items-center gap-3 p-3 text-sm hover:no-underline",
					)}
				>
					<div className="image-frame h-14 w-20">
						<span className="image-frame-overlay" aria-hidden="true" />
						<HeaderBlogPreviewImage src={post.imageUrl} alt={post.title} />
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-kicker text-[0.68rem]">
							{post.publishedAtLabel}
						</span>
						<span className="text-sm font-semibold text-foreground group-hover:text-secondary line-clamp-2">
							{post.title}
						</span>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

export function HeaderLocaleSwitcher({
	locale,
	onSwitchLocale,
}: {
	locale: Locale;
	onSwitchLocale: (locale: Locale) => void;
}) {
	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={() => onSwitchLocale("fr-FR")}
				className={`rounded-lg border-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${
					locale === "fr-FR"
						? "border-secondary bg-secondary text-secondary-foreground"
						: "border-secondary/60 bg-transparent text-secondary hover:border-accent hover:text-accent"
				}`}
			>
				FR
			</button>
			<button
				type="button"
				onClick={() => onSwitchLocale("en-US")}
				className={`rounded-lg border-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${
					locale === "en-US"
						? "border-secondary bg-secondary text-secondary-foreground"
						: "border-secondary/60 bg-transparent text-secondary hover:border-accent hover:text-accent"
				}`}
			>
				EN
			</button>
		</div>
	);
}

function HeaderBlogPreviewImage({
	src,
	alt,
}: {
	src: string | null;
	alt: string;
}) {
	if (!src) {
		return (
			<div className="relative h-full w-full bg-muted" aria-hidden="true" />
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			className="image-treated relative h-full w-full object-cover"
		/>
	);
}
