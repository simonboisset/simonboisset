import {
	createRootRoute,
	HeadContent,
	Link,
	redirect,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import {
	ANALYTICS_EVENTS,
	buildPageViewProperties,
	getUtmParams,
	useAnalytics,
	useAnalyticsConsent,
} from "@/lib/analytics";
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
import ConsentBanner from "../components/blocks/ConsentBanner";
import Header from "../components/blocks/Header";
import SiteFooter from "../components/blocks/SiteFooter";

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
	const { capture, register, registerOnce } = useAnalytics();
	const { state: consentState } = useAnalyticsConsent({
		syncWithPosthog: false,
	});

	useEffect(() => {
		setLocaleCookie(locale);
		if (typeof document !== "undefined") {
			document.documentElement.lang = locale;
		}
	}, [locale]);

	useEffect(() => {
		if (consentState !== "granted") return;
		if (typeof window === "undefined") return;

		const { pathname, searchStr, hash } = router.state.location;
		const pageProperties = buildPageViewProperties({
			pathname,
			searchStr,
			hash,
			locale,
		});
		const utmParams = getUtmParams(searchStr);

		if (Object.keys(utmParams).length > 0) {
			registerOnce(utmParams);
		}

		register({ locale });

		capture(ANALYTICS_EVENTS.pageView, {
			$current_url: window.location.href,
			...pageProperties,
		});
	}, [
		capture,
		consentState,
		locale,
		register,
		registerOnce,
		router.state.location.hash,
		router.state.location.pathname,
		router.state.location.searchStr,
	]);

	return (
		<html lang={locale}>
			<head>
				<HeadContent />
			</head>
			<body>
				<AnalyticsProvider>
					<div className="min-h-screen flex flex-col">
						<Header blogPosts={blogPreview} />
						<main className="flex-1">{children}</main>
						<SiteFooter />
					</div>
					{env.VITE_POSTHOG_KEY ? <ConsentBanner /> : null}
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
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6">
			<div className="text-center space-y-6 max-w-md">
				<p className="text-sm uppercase tracking-[0.3em] text-slate-500">
					{t((t) => t.notFound.label)}
				</p>
				<h1 className="text-5xl md:text-6xl font-semibold text-slate-900">
					{t((t) => t.notFound.title)}
				</h1>
				<p className="text-slate-600">{t((t) => t.notFound.description)}</p>
				<Button asChild>
					<Link to="/{-$locale}" params={{ locale: localeParam }}>
						{t((t) => t.notFound.backHome)}
					</Link>
				</Button>
			</div>
		</div>
	);
}

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
	if (!env.VITE_POSTHOG_KEY) {
		return <>{children}</>;
	}

	return (
		<PostHogProvider
			apiKey={env.VITE_POSTHOG_KEY}
			options={{
				api_host: env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com",
				opt_out_capturing_persistence_type: "localStorage",
				cookieless_mode: "on_reject",
				opt_out_capturing_by_default: true,
				capture_pageview: false,
			}}
		>
			{children}
		</PostHogProvider>
	);
}
