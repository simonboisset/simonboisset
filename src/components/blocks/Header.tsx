import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function Header() {
	const router = useRouter();
	const pathname = router.state.location.pathname;

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f6f1ea]/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/"
						className="text-lg font-semibold tracking-tight text-slate-900"
					>
						Simon Boisset
					</Link>
					<span className="hidden text-xs uppercase tracking-[0.3em] text-slate-500 md:inline">
						Mobile + Full-stack
					</span>
				</div>
				<nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 md:gap-6">
					<a href="/#services" className="hover:text-slate-900">
						Services
					</a>
					<a href="/#projects" className="hover:text-slate-900">
						Projects
					</a>
					<a href="/#testimonials" className="hover:text-slate-900">
						Testimonials
					</a>
					<Link
						to="/blog"
						className={pathname.startsWith("/blog") ? "text-slate-900" : ""}
					>
						Blog
					</Link>
					<Link
						to="/docs/legal"
						className={pathname.startsWith("/docs") ? "text-slate-900" : ""}
					>
						Legal
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					<Button asChild size="sm">
						<a href="mailto:hello@simonboisset.dev">Book a call</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
