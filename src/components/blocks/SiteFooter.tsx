import { Link } from "@tanstack/react-router";
import { env } from "@/env";
import { ANALYTICS_CONSENT_EVENT } from "@/lib/analytics";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function SiteFooter() {
	const showConsentLink = Boolean(env.VITE_POSTHOG_KEY);
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	const handleManageConsent = () => {
		if (typeof window === "undefined") return;
		window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
	};

	return (
		<footer className="border-t border-slate-200/80 bg-[#f3ede4]">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
				<div className="space-y-2">
					<p className="text-lg font-semibold text-slate-900">
						{t((t) => t.nav.brand)}
					</p>
					<p className="text-sm text-slate-600">
						{t((t) => t.footer.description)}
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
					<a
						href={SCHEDULE_VISIO_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-slate-900"
					>
						{t((t) => t.footer.scheduleCall)}
					</a>
					<span className="text-slate-300">|</span>
					<Link to="/{-$locale}/blog" params={localeParams}>
						{t((t) => t.footer.blog)}
					</Link>
					<span className="text-slate-300">|</span>
					<Link to="/{-$locale}/docs" params={localeParams}>
						{t((t) => t.footer.docs)}
					</Link>
					{showConsentLink ? (
						<>
							<span className="text-slate-300">|</span>
							<button
								type="button"
								onClick={handleManageConsent}
								className="hover:text-slate-900"
							>
								{t((t) => t.footer.manageConsent)}
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
						{t((t) => t.footer.github)}
					</a>
				</div>
			</div>
		</footer>
	);
}
