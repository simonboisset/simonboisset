import { Link, useRouter } from "@tanstack/react-router";
import { Github } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ANALYTICS_EVENTS, useAnalytics } from "@/lib/analytics";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";
import type { PostSummary } from "@/lib/directus";
import {
	buildLocalizedPath,
	type Locale,
	setLocaleCookie,
	stripLocaleFromPathname,
} from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";

type HeaderProps = {
	blogPosts?: PostSummary[];
};

export default function Header({ blogPosts = [] }: HeaderProps) {
	const router = useRouter();
	const { t, locale, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const pathname = router.state.location.pathname;
	const basePathname = stripLocaleFromPathname(pathname);
	const isBlogActive = basePathname.startsWith("/blog");
	const blogPreview = blogPosts.slice(0, 2);
	const triggerClassName = cn(navigationMenuTriggerStyle(), "bg-transparent");
	const aboutItems = [
		{
			title: t((t) => t.nav.services),
			description: t((t) => t.nav.aboutItems.services),
			hash: "services",
		},
		{
			title: t((t) => t.nav.projects),
			description: t((t) => t.nav.aboutItems.projects),
			hash: "projects",
		},
		{
			title: t((t) => t.nav.testimonials),
			description: t((t) => t.nav.aboutItems.testimonials),
			hash: "testimonials",
		},
	];
	const serviceItems = [
		{
			title: t((t) => t.services.legacy.title),
			description: t((t) => t.services.legacy.intro),
			to: "/{-$locale}/services/react-native-legacy-to-expo",
		},
		{
			title: t((t) => t.services.workflow.title),
			description: t((t) => t.services.workflow.intro),
			to: "/{-$locale}/services/expo-workflow-optimization",
		},
	];
	const switchLocale = (nextLocale: Locale) => {
		if (nextLocale === locale) return;
		capture(ANALYTICS_EVENTS.localeSwitch, {
			from_locale: locale,
			to_locale: nextLocale,
			placement: "header",
		});
		setLocaleCookie(nextLocale);
		const nextPath = buildLocalizedPath(
			router.state.location.pathname,
			router.state.location.searchStr,
			router.state.location.hash,
			nextLocale,
		);
		router.history.push(nextPath);
	};

	return (
		<header className="sticky top-0 z-50 border-b-2 border-secondary/50 bg-background/92 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/{-$locale}"
						params={localeParams}
						className="terminal-cursor text-lg font-semibold tracking-tight text-foreground hover:text-secondary"
					>
						{t((t) => t.nav.brand)}
					</Link>
					<span className="terminal-label hidden md:inline">
						{t((t) => t.nav.tagline)}
					</span>
				</div>
				<nav className="flex w-full flex-wrap items-center gap-4 text-sm text-muted-foreground md:w-auto md:gap-6">
					<NavigationMenu className="w-full max-w-full flex-none justify-start md:w-auto md:max-w-max">
						<NavigationMenuList className="flex w-full flex-wrap justify-start gap-2 md:w-auto md:flex-nowrap">
							<NavigationMenuItem>
								<NavigationMenuTrigger className={triggerClassName}>
									{t((t) => t.nav.about)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="w-[calc(100vw-3rem)] max-w-[420px] p-4 md:w-[420px]">
									<ul className="grid gap-3">
										{aboutItems.map((item) => (
											<HeaderMenuLink
												key={item.hash}
												title={item.title}
												description={item.description}
												to="/{-$locale}"
												params={localeParams}
												hash={item.hash}
											/>
										))}
										<HeaderMenuExternalLink
											title={t((t) => t.footer.github)}
											description={t((t) => t.nav.aboutItems.github)}
											href={GITHUB_URL}
											variant="brand"
											icon={<Github className="h-4 w-4" aria-hidden="true" />}
											onClick={() =>
												capture(ANALYTICS_EVENTS.ctaClick, {
													cta: "github",
													placement: "header_menu",
													href: GITHUB_URL,
												})
											}
										/>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className={triggerClassName}>
									{t((t) => t.nav.services)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="w-[calc(100vw-3rem)] max-w-[560px] p-4 md:w-[560px]">
									<ul className="grid gap-3 md:grid-cols-2">
										{serviceItems.map((item) => (
											<HeaderMenuLink
												key={item.to}
												title={item.title}
												description={item.description}
												to={item.to}
												params={localeParams}
												className="h-full"
											/>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										triggerClassName,
										isBlogActive && "border-secondary bg-muted text-secondary",
									)}
								>
									{t((t) => t.nav.blog)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="w-[calc(100vw-3rem)] max-w-[480px] p-4 md:w-[480px]">
									<div className="flex items-center justify-between px-1 pb-2">
										<p className="terminal-label">{t((t) => t.blog.latest)}</p>
										<Link
											to="/{-$locale}/blog"
											params={localeParams}
											className="text-xs font-semibold uppercase tracking-[0.08em] text-secondary hover:text-accent"
										>
											{t((t) => t.nav.blogAll)}
										</Link>
									</div>
									{blogPreview.length === 0 ? (
										<p className="terminal-card p-4 text-sm">
											{t((t) => t.blog.empty)}
										</p>
									) : (
										<ul className="grid gap-3 md:grid-cols-2">
											{blogPreview.map((post) => (
												<BlogPreviewLink
													key={post.slug}
													post={post}
													localeParams={localeParams}
												/>
											))}
										</ul>
									)}
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</nav>
				<div className="flex flex-wrap items-center gap-3">
					<Button asChild size="sm">
						<a
							href={SCHEDULE_VISIO_URL}
							target="_blank"
							rel="noreferrer"
							onClick={() =>
								capture(ANALYTICS_EVENTS.ctaClick, {
									cta: "schedule_call",
									placement: "header",
									href: SCHEDULE_VISIO_URL,
								})
							}
						>
							{t((t) => t.nav.bookCall)}
						</a>
					</Button>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => switchLocale("fr-FR")}
							className={`rounded-[var(--radius)] border-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${
								locale === "fr-FR"
									? "border-secondary bg-secondary text-secondary-foreground"
									: "border-secondary/60 bg-transparent text-secondary hover:border-accent hover:text-accent"
							}`}
						>
							FR
						</button>
						<button
							type="button"
							onClick={() => switchLocale("en-US")}
							className={`rounded-[var(--radius)] border-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${
								locale === "en-US"
									? "border-secondary bg-secondary text-secondary-foreground"
									: "border-secondary/60 bg-transparent text-secondary hover:border-accent hover:text-accent"
							}`}
						>
							EN
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

type HeaderMenuLinkProps = {
	title: string;
	description: string;
	to: string;
	params: Record<string, string>;
	icon?: React.ReactNode;
	hash?: string;
	className?: string;
};

function HeaderMenuLink({
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
						"group terminal-card flex h-full flex-col gap-2 p-3 text-sm hover:no-underline",
						className,
					)}
				>
					{icon ? (
						<span className="flex items-center gap-3">
							<span className="terminal-chip flex h-12 w-12 items-center justify-center p-0">
								{icon}
							</span>
							<span className="flex min-h-12 flex-col justify-center">
								<span className="text-sm font-semibold text-foreground group-hover:text-secondary">
									{title}
								</span>
								<span className="terminal-muted text-xs line-clamp-2">
									{description}
								</span>
							</span>
						</span>
					) : (
						<>
							<span className="text-sm font-semibold text-foreground group-hover:text-secondary">
								{title}
							</span>
							<span className="terminal-muted text-xs line-clamp-3">
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

function HeaderMenuExternalLink({
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
						"group terminal-card flex h-full items-start gap-3 p-3 text-sm transition hover:no-underline",
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
								isBrand ? "text-foreground/80" : "terminal-muted",
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

type BlogPreviewLinkProps = {
	post: PostSummary;
	localeParams: Record<string, string>;
};

function BlogPreviewLink({ post, localeParams }: BlogPreviewLinkProps) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to="/{-$locale}/blog/$slug"
					params={{ ...localeParams, slug: post.slug }}
					className="group terminal-card flex items-center gap-3 p-3 text-sm hover:no-underline"
				>
					<div className="terminal-image-frame h-14 w-20">
						<BlogPreviewImage src={post.imageUrl} alt={post.title} />
					</div>
					<div className="flex flex-col gap-1">
						<span className="terminal-label text-[0.68rem]">
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

function BlogPreviewImage({ src, alt }: { src: string | null; alt: string }) {
	if (!src) {
		return <div className="h-full w-full bg-muted" aria-hidden="true" />;
	}

	return (
		<img
			src={src}
			alt={alt}
			className="terminal-image h-full w-full object-cover"
		/>
	);
}
