import { Link } from "@tanstack/react-router";

export default function SiteFooter() {
	return (
		<footer className="border-t border-slate-200/80 bg-[#f3ede4]">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
				<div className="space-y-2">
					<p className="text-lg font-semibold text-slate-900">Simon Boisset</p>
					<p className="text-sm text-slate-600">
						Freelance mobile + full-stack developer. React Native, Expo, React,
						TypeScript.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
					<a href="mailto:hello@simonboisset.dev" className="hover:text-slate-900">
						hello@simonboisset.dev
					</a>
					<span className="text-slate-300">|</span>
					<Link to="/blog" className="hover:text-slate-900">
						Blog
					</Link>
					<span className="text-slate-300">|</span>
					<Link to="/docs/legal" className="hover:text-slate-900">
						Legal docs
					</Link>
				</div>
			</div>
		</footer>
	);
}
