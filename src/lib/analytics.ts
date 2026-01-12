import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { z } from "zod";

export const ANALYTICS_CONSENT_KEY = "analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "analytics-consent-open";

const consentStateSchema = z.enum(["pending", "granted", "denied"]);
export type ConsentState = z.infer<typeof consentStateSchema>;

export const useAnalyticsConsent = () => {
	const posthog = usePostHog();
	const [state, setState] = useState<ConsentState | "loading">("loading");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
		const parsed = consentStateSchema.safeParse(stored);

		if (parsed.success) {
			setState(parsed.data);
			if (parsed.data === "granted") {
				posthog?.opt_in_capturing();
			} else {
				posthog?.opt_out_capturing();
			}
			return;
		}

		setState("pending");
	}, [posthog]);

	const grantConsent = () => {
		if (typeof window === "undefined") return;
		localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
		setState("granted");
		posthog?.opt_in_capturing();
	};

	const denyConsent = () => {
		if (typeof window === "undefined") return;
		localStorage.setItem(ANALYTICS_CONSENT_KEY, "denied");
		setState("denied");
		posthog?.opt_out_capturing();
	};

	return { state, grantConsent, denyConsent };
};
