import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	redirect,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { AnalyticsProvider, RootShell } from "@/components/blocks/RootShell";
import { Button } from "@/components/ui/button";
import { usePageViewAnalytics } from "@/hooks/use-page-view-analytics";
import { directus } from "@/lib/directus";
import {
	addLocaleToPathname,
	buildPath,
	DEFAULT_LOCALE,
	extractLocaleFromPathname,
	getClientLocaleFromCookie,
	getSafeLocale,
	readServerLocale,
	resolveLocaleForPath,
	setLocaleCookie,
	stripLocaleFromPathname,
} from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	beforeLoad: ({ location, serverContext }) => {
		const { locale: pathLocale, segment } = extractLocaleFromPathname(
			location.pathname,
		);
		const clientCookieLocale = getClientLocaleFromCookie();
		const serverLocale = readServerLocale(serverContext);

		const resolvedLocale = getSafeLocale(
			pathLocale ?? undefined,
			serverLocale,
			clientCookieLocale,
		);
		const basePathname = segment
			? stripLocaleFromPathname(location.pathname)
			: location.pathname;
		if (basePathname === "/sitemap.xml" || basePathname === "/robots.txt") {
			if (segment) {
				throw redirect({
					href: buildPath(basePathname, location.searchStr, location.hash),
				});
			}
			return {
				locale: resolvedLocale,
				isLocalePrefixed: false,
			};
		}
		const shouldPrefix = resolvedLocale !== DEFAULT_LOCALE;
		const targetPathname = shouldPrefix
			? addLocaleToPathname(basePathname, resolvedLocale)
			: basePathname;

		if (targetPathname !== location.pathname) {
			throw redirect({
				href: buildPath(targetPathname, location.searchStr, location.hash),
			});
		}

		return {
			locale: resolvedLocale,
			isLocalePrefixed: shouldPrefix,
		};
	},
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const posts = await directus.getPosts({ data: { locale } });
		return { blogPreview: posts.slice(0, 2) };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/logo192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "512x512",
				href: "/logo512.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { locale } = Route.useRouteContext();
	const { blogPreview } = Route.useLoaderData();
	const router = useRouter();
	const isCvRoute =
		stripLocaleFromPathname(router.state.location.pathname) === "/cv";
	usePageViewAnalytics(locale);

	useEffect(() => {
		setLocaleCookie(locale);
		if (typeof document !== "undefined") {
			document.documentElement.lang = locale;
		}
	}, [locale]);

	return (
		<html lang={locale}>
			<head>
				<HeadContent />
			</head>
			<body>
				<AnalyticsProvider>
					<RootShell blogPreview={blogPreview} isCvRoute={isCvRoute}>
						{children}
					</RootShell>
				</AnalyticsProvider>
				{import.meta.env.DEV ? (
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{
								name: "TanStack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				) : null}
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	const { t, localeParam } = useI18n();

	return (
		<div className="terminal-page flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6">
			<div className="max-w-md space-y-6 text-center">
				<p className="terminal-label">{t((t) => t.notFound.label)}</p>
				<h1 className="terminal-heading text-5xl md:text-6xl">
					{t((t) => t.notFound.title)}
				</h1>
				<p className="terminal-muted">{t((t) => t.notFound.description)}</p>
				<Button asChild>
					<Link to="/{-$locale}" params={{ locale: localeParam }}>
						{t((t) => t.notFound.backHome)}
					</Link>
				</Button>
			</div>
		</div>
	);
}
