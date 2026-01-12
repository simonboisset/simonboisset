import { Link } from "@tanstack/react-router";
import { env } from "@/env";
import { ANALYTICS_CONSENT_EVENT } from "@/lib/analytics";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";

export default function SiteFooter() {
	const showConsentLink = Boolean(env.VITE_POSTHOG_KEY);

	const handleManageConsent = () => {
		if (typeof window === "undefined") return;
		window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
	};

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
					<a
						href={SCHEDULE_VISIO_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-slate-900"
					>
						Schedule a call
					</a>
					<span className="text-slate-300">|</span>
					<Link to="/blog" className="hover:text-slate-900">
						Blog
					</Link>
					<span className="text-slate-300">|</span>
					<Link to="/docs" className="hover:text-slate-900">
						Docs
					</Link>
					{showConsentLink ? (
						<>
							<span className="text-slate-300">|</span>
							<button
								type="button"
								onClick={handleManageConsent}
								className="hover:text-slate-900"
							>
								Manage consent
							</button>
						</>
					) : null}
					<span className="text-slate-300">|</span>
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-slate-900"
					>
						GitHub
					</a>
				</div>
			</div>
		</footer>
	);
}
