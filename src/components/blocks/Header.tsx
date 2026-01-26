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
	type Locale,
	buildLocalizedPath,
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
	const triggerClassName = cn(
		navigationMenuTriggerStyle(),
		"bg-transparent text-slate-600 hover:bg-white/70 hover:text-slate-900 focus:bg-white/70 data-[state=open]:bg-white/80 data-[state=open]:text-slate-900",
	);
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
	const productItems = [
		{
			title: t((t) => t.nav.saasStarter),
			description: t((t) => t.products.saasStarter.hero.subtitle),
			to: "/{-$locale}/products/saas-starter-template",
			icon: (
				<img
					src="/icon-515x515.png"
					alt="Keystone Stack icon"
					className="h-12 w-12 rounded-xl border border-slate-200 bg-white shadow-sm"
				/>
			),
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
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f6f1ea]/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/{-$locale}"
						params={localeParams}
						className="text-lg font-semibold tracking-tight text-slate-900"
					>
						{t((t) => t.nav.brand)}
					</Link>
					<span className="hidden text-xs uppercase tracking-[0.3em] text-slate-500 md:inline">
						{t((t) => t.nav.tagline)}
					</span>
				</div>
				<nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 md:gap-6">
					<NavigationMenu className="flex-none">
						<NavigationMenuList className="flex-none gap-2">
							<NavigationMenuItem>
								<NavigationMenuTrigger className={triggerClassName}>
									{t((t) => t.nav.about)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-4 md:w-[420px]">
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
								<NavigationMenuContent className="p-4 md:w-[560px]">
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
								<NavigationMenuTrigger className={triggerClassName}>
									{t((t) => t.nav.products)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-4 md:w-[420px]">
									<ul className="grid gap-3">
										{productItems.map((item) => (
											<HeaderMenuLink
												key={item.to}
												title={item.title}
												description={item.description}
												to={item.to}
												params={localeParams}
												icon={item.icon}
											/>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										triggerClassName,
										isBlogActive && "text-slate-900",
									)}
								>
									{t((t) => t.nav.blog)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-4 md:w-[480px]">
									<div className="flex items-center justify-between px-1 pb-2">
										<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
											{t((t) => t.blog.latest)}
										</p>
										<Link
											to="/{-$locale}/blog"
											params={localeParams}
											className="text-xs font-semibold text-teal-700 hover:text-teal-800"
										>
											{t((t) => t.nav.blogAll)}
										</Link>
									</div>
									{blogPreview.length === 0 ? (
										<p className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
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
							className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								locale === "fr-FR"
									? "border-slate-900 bg-slate-900 text-white"
									: "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
							}`}
						>
							FR
						</button>
						<button
							type="button"
							onClick={() => switchLocale("en-US")}
							className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								locale === "en-US"
									? "border-slate-900 bg-slate-900 text-white"
									: "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
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
						"group flex h-full flex-col gap-2 rounded-xl border border-transparent bg-white/60 p-3 text-sm text-slate-700 transition hover:border-slate-200 hover:bg-white",
						className,
					)}
				>
					{icon ? (
						<span className="flex items-center gap-3">
							<span className="flex h-12 w-12 items-center justify-center">
								{icon}
							</span>
							<span className="flex min-h-12 flex-col justify-center">
								<span className="text-sm font-semibold text-slate-900 group-hover:text-teal-700">
									{title}
								</span>
								<span className="text-xs text-slate-500 line-clamp-2">
									{description}
								</span>
							</span>
						</span>
					) : (
						<>
							<span className="text-sm font-semibold text-slate-900 group-hover:text-teal-700">
								{title}
							</span>
							<span className="text-xs text-slate-500 line-clamp-3">
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
						"group flex h-full items-start gap-3 rounded-xl border border-transparent p-3 text-sm transition",
						isBrand
							? "bg-[#24292f] text-white hover:bg-[#1f2328]"
							: "bg-white/60 text-slate-700 hover:border-slate-200 hover:bg-white",
						className,
					)}
				>
					{icon ? (
						<span
							className={cn(
								"mt-0.5 rounded-md p-1",
								isBrand ? "bg-white/10 text-white" : "bg-slate-900 text-white",
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
									: "text-slate-900 group-hover:text-teal-700",
							)}
						>
							{title}
						</span>
						<span
							className={cn(
								"text-xs line-clamp-3",
								isBrand ? "text-slate-200" : "text-slate-500",
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
					className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/60 p-3 text-sm text-slate-700 transition hover:border-slate-200 hover:bg-white"
				>
					<div className="h-14 w-20 overflow-hidden rounded-md bg-slate-100">
						<BlogPreviewImage src={post.imageUrl} alt={post.title} />
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs uppercase tracking-[0.2em] text-slate-500">
							{post.publishedAtLabel}
						</span>
						<span className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 line-clamp-2">
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
		return <div className="h-full w-full bg-slate-100" aria-hidden="true" />;
	}

	return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}
