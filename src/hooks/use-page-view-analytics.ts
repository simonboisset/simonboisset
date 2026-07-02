import { useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import {
	ANALYTICS_EVENTS,
	buildPageViewProperties,
	getUtmParams,
	useAnalytics,
	useAnalyticsConsent,
} from "@/lib/analytics";

export function usePageViewAnalytics(locale: string) {
	const router = useRouter();
	const { capture, register, registerOnce } = useAnalytics();
	const { state: consentState } = useAnalyticsConsent({
		syncWithPosthog: false,
	});
	const pageLeaveRef = useRef<{
		startedAt: number;
		properties: Record<string, unknown>;
		captured: boolean;
	} | null>(null);

	const capturePageLeave = useCallback(
		(reason: string) => {
			const entry = pageLeaveRef.current;
			if (!entry || entry.captured) return;

			entry.captured = true;
			const durationSeconds = Math.round((Date.now() - entry.startedAt) / 1000);

			capture(ANALYTICS_EVENTS.pageLeave, {
				...entry.properties,
				duration_seconds: durationSeconds,
				reason,
			});
		},
		[capture],
	);

	useEffect(() => {
		if (consentState !== "granted") return;
		if (typeof window === "undefined") return;

		const { pathname, searchStr, hash } = router.state.location;
		const currentUrl = window.location.href;
		const pageProperties = buildPageViewProperties({
			pathname,
			searchStr,
			hash,
			locale,
		});
		const utmParams = getUtmParams(searchStr);

		if (Object.keys(utmParams).length > 0) {
			registerOnce(utmParams);
		}

		register({ locale });

		pageLeaveRef.current = {
			startedAt: Date.now(),
			properties: {
				$current_url: currentUrl,
				...pageProperties,
			},
			captured: false,
		};

		capture(ANALYTICS_EVENTS.pageView, {
			$current_url: currentUrl,
			...pageProperties,
		});

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				capturePageLeave("visibility_hidden");
			}
		};

		const handlePageHide = () => {
			capturePageLeave("page_hide");
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("pagehide", handlePageHide);

		return () => {
			capturePageLeave("route_change");
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("pagehide", handlePageHide);
		};
	}, [
		capture,
		capturePageLeave,
		consentState,
		locale,
		register,
		registerOnce,
		router.state.location.hash,
		router.state.location.pathname,
		router.state.location.searchStr,
		router.state.location,
	]);
}
