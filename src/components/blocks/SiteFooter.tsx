import { Link } from "@tanstack/react-router";
import { env } from "@/env";
import {
	ANALYTICS_CONSENT_EVENT,
	ANALYTICS_EVENTS,
	useAnalytics,
} from "@/lib/analytics";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function SiteFooter() {
	const showConsentLink = Boolean(env.VITE_POSTHOG_KEY);
	const { t, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	const handleManageConsent = () => {
		if (typeof window === "undefined") return;
		window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
	};

	return (
		<footer className="border-t-2 border-secondary/50 bg-background">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
				<div className="space-y-2">
					<p className="text-heading text-lg">{t((t) => t.nav.brand)}</p>
					<p className="text-body-muted text-sm">
						{t((t) => t.footer.description)}
					</p>
					<p className="text-kicker">&gt; schedule_call --slot available</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
					<a
						href={SCHEDULE_VISIO_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-secondary"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "schedule_call",
								placement: "footer",
								href: SCHEDULE_VISIO_URL,
							})
						}
					>
						{t((t) => t.footer.scheduleCall)}
					</a>
					<span className="text-secondary/50">|</span>
					<Link
						to="/{-$locale}/blog"
						params={localeParams}
						className="hover:text-secondary"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "blog",
								placement: "footer",
								href: "/blog",
							})
						}
					>
						{t((t) => t.footer.blog)}
					</Link>
					<span className="text-secondary/50">|</span>
					<Link
						to="/{-$locale}/docs"
						params={localeParams}
						className="hover:text-secondary"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "docs",
								placement: "footer",
								href: "/docs",
							})
						}
					>
						{t((t) => t.footer.docs)}
					</Link>
					{showConsentLink ? (
						<>
							<span className="text-secondary/50">|</span>
							<button
								type="button"
								onClick={handleManageConsent}
								className="hover:text-secondary"
							>
								{t((t) => t.footer.manageConsent)}
							</button>
						</>
					) : null}
					<span className="text-secondary/50">|</span>
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-secondary"
						onClick={() =>
							capture(ANALYTICS_EVENTS.ctaClick, {
								cta: "github",
								placement: "footer",
								href: GITHUB_URL,
							})
						}
					>
						{t((t) => t.footer.github)}
					</a>
				</div>
			</div>
		</footer>
	);
}
