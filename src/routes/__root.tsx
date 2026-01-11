import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppSidebar } from "@/components/blocks/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Header from "../components/blocks/Header";

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
				<SidebarProvider>
					<AppSidebar variant="floating" />
					<SidebarInset>
						<Header />
						{children}
					</SidebarInset>
				</SidebarProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
			<div className="text-center space-y-6 max-w-md">
				<h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
				<h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
					Page Not Found
				</h2>
				<p className="text-zinc-600 dark:text-zinc-400">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Button asChild>
					<Link to="/">
						Back to Home
					</Link>
				</Button>
			</div>
		</div>
	);
}
