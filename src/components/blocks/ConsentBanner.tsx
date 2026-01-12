import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ANALYTICS_CONSENT_EVENT, useAnalyticsConsent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n/use-i18n";

type ConsentBannerProps = {
	enabled?: boolean;
};

export default function ConsentBanner({ enabled = true }: ConsentBannerProps) {
	const { state, grantConsent, denyConsent } = useAnalyticsConsent();
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const [showDetails, setShowDetails] = useState(false);
	const [forceShow, setForceShow] = useState(false);

	const isVisible =
		enabled && state !== "loading" && (forceShow || state === "pending");

	const handleGrantConsent = () => {
		grantConsent();
		setForceShow(false);
	};

	const handleDenyConsent = () => {
		denyConsent();
		setForceShow(false);
	};

	const handleClose = () => {
		setForceShow(false);
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleOpen = () => {
			setForceShow(true);
		};

		window.addEventListener(ANALYTICS_CONSENT_EVENT, handleOpen);
		return () =>
			window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleOpen);
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-lg">
			<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
				<h2 className="text-lg font-semibold text-slate-900">
					{t((t) => t.consent.title)}
				</h2>
				<p className="mt-2 text-sm text-slate-600">
					{t((t) => t.consent.description)}
				</p>

				{showDetails ? (
					<div className="mt-4 space-y-4 text-sm text-slate-600">
						<div>
							<p className="font-semibold text-slate-900">
								{t((t) => t.consent.essentialTitle)}
							</p>
							<p>{t((t) => t.consent.essentialDescription)}</p>
						</div>
						<div>
							<p className="font-semibold text-slate-900">
								{t((t) => t.consent.analyticsTitle)}
							</p>
							<p>{t((t) => t.consent.analyticsDescription)}</p>
						</div>
						<Link
							to="/{-$locale}/docs/$slug"
							params={{ ...localeParams, slug: "privacy" }}
							className="text-sm font-semibold text-teal-700 hover:text-teal-800"
						>
							{t((t) => t.consent.policyLink)}
						</Link>
					</div>
				) : null}

				<div className="mt-4 flex flex-wrap items-center gap-3">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowDetails((prev) => !prev)}
					>
						{showDetails
							? t((t) => t.consent.hideDetails)
							: t((t) => t.consent.showDetails)}
					</Button>
					{forceShow && state !== "pending" ? (
						<Button variant="ghost" size="sm" onClick={handleClose}>
							{t((t) => t.consent.close)}
						</Button>
					) : null}
					<Button variant="outline" size="sm" onClick={handleDenyConsent}>
						{t((t) => t.consent.deny)}
					</Button>
					<Button size="sm" onClick={handleGrantConsent}>
						{t((t) => t.consent.accept)}
					</Button>
				</div>
			</div>
		</div>
	);
}
