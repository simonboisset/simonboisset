import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ANALYTICS_CONSENT_EVENT, useAnalyticsConsent } from "@/lib/analytics";

type ConsentBannerProps = {
	enabled?: boolean;
};

export default function ConsentBanner({ enabled = true }: ConsentBannerProps) {
	const { state, grantConsent, denyConsent } = useAnalyticsConsent();
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
		return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleOpen);
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-lg">
			<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
				<h2 className="text-lg font-semibold text-slate-900">
					Consentement analytics
				</h2>
				<p className="mt-2 text-sm text-slate-600">
					Nous utilisons PostHog pour mesurer l'audience et ameliorer
					l'experience. Vous pouvez accepter ou refuser.
				</p>

				{showDetails ? (
					<div className="mt-4 space-y-4 text-sm text-slate-600">
						<div>
							<p className="font-semibold text-slate-900">Essentiel</p>
							<p>
								Stockage de votre choix de consentement dans le navigateur.
							</p>
						</div>
						<div>
							<p className="font-semibold text-slate-900">Analytics</p>
							<p>
								PostHog (hebergement UE) pour comprendre les pages visitees et
								les parcours.
							</p>
						</div>
						<Link
							to="/docs/politique-confidentialite"
							className="text-sm font-semibold text-teal-700 hover:text-teal-800"
						>
							Voir la politique de confidentialite
						</Link>
					</div>
				) : null}

				<div className="mt-4 flex flex-wrap items-center gap-3">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowDetails((prev) => !prev)}
					>
						{showDetails ? "Masquer les details" : "Voir les details"}
					</Button>
					{forceShow && state !== "pending" ? (
						<Button variant="ghost" size="sm" onClick={handleClose}>
							Fermer
						</Button>
					) : null}
					<Button variant="outline" size="sm" onClick={handleDenyConsent}>
						Refuser
					</Button>
					<Button size="sm" onClick={handleGrantConsent}>
						Accepter
					</Button>
				</div>
			</div>
		</div>
	);
}
