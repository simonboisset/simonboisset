import { PostHogProvider } from "posthog-js/react";
import type React from "react";
import { env } from "@/env";
import type { PostSummary } from "@/lib/directus";
import ConsentBanner from "./ConsentBanner";
import Header from "./Header";
import SiteFooter from "./SiteFooter";

export function RootShell({
	children,
	blogPreview,
	isCvRoute,
}: {
	children: React.ReactNode;
	blogPreview: PostSummary[];
	isCvRoute: boolean;
}) {
	if (isCvRoute) {
		return <main>{children}</main>;
	}

	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Header blogPosts={blogPreview} />
				<main className="flex-1">{children}</main>
				<SiteFooter />
			</div>
			{env.VITE_POSTHOG_KEY ? <ConsentBanner /> : null}
		</>
	);
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
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
				enable_heatmaps: true,
				capture_exceptions: true,
			}}
		>
			{children}
		</PostHogProvider>
	);
}
