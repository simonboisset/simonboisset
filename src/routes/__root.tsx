import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Header from "../components/blocks/Header";
import SiteFooter from "../components/blocks/SiteFooter";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
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
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<SiteFooter />
				</div>
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6">
			<div className="text-center space-y-6 max-w-md">
				<p className="text-sm uppercase tracking-[0.3em] text-slate-500">
					Error 404
				</p>
				<h1 className="text-5xl md:text-6xl font-semibold text-slate-900">
					This page drifted away.
				</h1>
				<p className="text-slate-600">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Button asChild>
					<Link to="/">Back to Home</Link>
				</Button>
			</div>
		</div>
	);
}
