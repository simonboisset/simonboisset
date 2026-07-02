import { Link, useRouter } from "@tanstack/react-router";
import { Github } from "lucide-react";
import {
	HeaderBlogPreviewLink,
	HeaderLocaleSwitcher,
	HeaderMenuExternalLink,
	HeaderMenuLink,
} from "@/components/blocks/header-links";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
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
			hash: "testimonials",
		},
		{
			title: t((t) => t.nav.method),
			description: t((t) => t.nav.aboutItems.method),
			hash: "process",
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
				<div className="relative flex items-center justify-between gap-4 md:contents">
					<div className="relative z-10 flex min-w-0 items-center gap-6">
						<Link
							to="/{-$locale}"
							params={localeParams}
							className="terminal-cursor truncate text-lg font-semibold tracking-tight text-foreground hover:text-secondary"
						>
							{t((t) => t.nav.brand)}
						</Link>
						<span className="terminal-label hidden md:inline">
							{t((t) => t.nav.tagline)}
						</span>
					</div>
					<nav className="pointer-events-none absolute inset-x-0 flex items-center justify-center text-sm text-muted-foreground md:pointer-events-auto md:static md:inset-auto md:shrink-0 md:items-center md:gap-6">
						<NavigationMenu className="pointer-events-auto w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] flex-none justify-center md:w-auto md:max-w-max md:justify-start">
							<NavigationMenuList className="flex flex-nowrap justify-center gap-2 md:justify-start">
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
									<NavigationMenuTrigger
										className={cn(
											triggerClassName,
											isBlogActive &&
												"border-secondary bg-muted text-secondary",
										)}
									>
										{t((t) => t.nav.blog)}
									</NavigationMenuTrigger>
									<NavigationMenuContent className="w-[calc(100vw-3rem)] max-w-[480px] p-4 md:w-[480px]">
										<div className="flex items-center justify-between px-1 pb-2">
											<p className="terminal-label">
												{t((t) => t.blog.latest)}
											</p>
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
													<HeaderBlogPreviewLink
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
				</div>
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
					<HeaderLocaleSwitcher locale={locale} onSwitchLocale={switchLocale} />
				</div>
			</div>
		</header>
	);
}
