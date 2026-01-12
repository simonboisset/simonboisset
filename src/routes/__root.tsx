import { useEffect } from "react";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
	redirect,
} from "@tanstack/react-router";
import { PostHogProvider } from "posthog-js/react";
import { Button } from "@/components/ui/button";
import Header from "../components/blocks/Header";
import SiteFooter from "../components/blocks/SiteFooter";
import ConsentBanner from "../components/blocks/ConsentBanner";
import { env } from "@/env";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
	DEFAULT_LOCALE,
	addLocaleToPathname,
	buildPath,
	extractLocaleFromPathname,
	getClientLocaleFromCookie,
	getSafeLocale,
	readServerLocale,
	setLocaleCookie,
	stripLocaleFromPathname,
	type Locale,
} from "@/lib/i18n/locale";

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
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				name: "description",
				content:
					"Simon Boisset, freelance mobile and full-stack developer specializing in React Native, Expo, and modern web apps.",
			},
			{
				title: "Simon Boisset - Developer Mobile React Native",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { locale } = Route.useRouteContext<{
		locale: Locale;
	}>();

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
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<SiteFooter />
					</div>
					{env.VITE_POSTHOG_KEY ? <ConsentBanner /> : null}
				</AnalyticsProvider>
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
				<p className="text-slate-600">
					{t((t) => t.notFound.description)}
				</p>
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
			}}
		>
			{children}
		</PostHogProvider>
	);
}
