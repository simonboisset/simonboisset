import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { stripLocaleFromPathname } from "@/lib/i18n/locale";

export const ANALYTICS_CONSENT_KEY = "analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "analytics-consent-open";
export const ANALYTICS_CONSENT_CHANGED_EVENT = "analytics-consent-changed";

export const ANALYTICS_EVENTS = {
	pageView: "$pageview",
	ctaClick: "cta_click",
	contentView: "content_view",
	contentRead: "content_read",
	contentClick: "content_click",
	sectionView: "section_view",
	waitlistStart: "waitlist_start",
	waitlistSubmit: "waitlist_submit",
	waitlistSuccess: "waitlist_success",
	waitlistError: "waitlist_error",
	localeSwitch: "locale_switch",
} as const;

export type AnalyticsEventName =
	(typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type PageType =
	| "home"
	| "blog_index"
	| "blog_post"
	| "docs_index"
	| "doc"
	| "service"
	| "product"
	| "other";

export type ContentType = "blog" | "doc" | "service" | "product";

const consentStateSchema = z.enum(["pending", "granted", "denied"]);
export type ConsentState = z.infer<typeof consentStateSchema>;

type UseAnalyticsConsentOptions = {
	syncWithPosthog?: boolean;
};

const notifyConsentChange = () => {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGED_EVENT));
};

const syncConsentFromStorage = (
	setState: (state: ConsentState) => void,
	posthog: ReturnType<typeof usePostHog>,
	syncWithPosthog: boolean,
) => {
	const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
	const parsed = consentStateSchema.safeParse(stored);

	if (parsed.success) {
		setState(parsed.data);
		if (syncWithPosthog) {
			if (parsed.data === "granted") {
				posthog?.opt_in_capturing();
			} else {
				posthog?.opt_out_capturing();
			}
		}
		return;
	}

	setState("pending");
};

export const useAnalyticsConsent = ({
	syncWithPosthog = true,
}: UseAnalyticsConsentOptions = {}) => {
	const posthog = usePostHog();
	const [state, setState] = useState<ConsentState | "loading">("loading");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleChange = () =>
			syncConsentFromStorage(setState, posthog, syncWithPosthog);

		handleChange();
		window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleChange);
		window.addEventListener("storage", handleChange);

		return () => {
			window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, handleChange);
			window.removeEventListener("storage", handleChange);
		};
	}, [posthog, syncWithPosthog]);

	const grantConsent = () => {
		if (typeof window === "undefined") return;
		localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
		setState("granted");
		if (syncWithPosthog) {
			posthog?.opt_in_capturing();
		}
		notifyConsentChange();
	};

	const denyConsent = () => {
		if (typeof window === "undefined") return;
		localStorage.setItem(ANALYTICS_CONSENT_KEY, "denied");
		setState("denied");
		if (syncWithPosthog) {
			posthog?.opt_out_capturing();
		}
		notifyConsentChange();
	};

	return { state, grantConsent, denyConsent };
};

export const useAnalyticsConsentState = () =>
	useAnalyticsConsent({ syncWithPosthog: false }).state;

const utmKeys = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
] as const;

export type UtmKey = (typeof utmKeys)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const getUtmParams = (search: string): UtmParams => {
	if (!search) return {};
	const query = search.startsWith("?") ? search : `?${search}`;
	const params = new URLSearchParams(query);
	const result: UtmParams = {};

	for (const key of utmKeys) {
		const value = params.get(key);
		if (value) {
			result[key] = value;
		}
	}

	return result;
};

export const normalizePathname = (pathname: string) => {
	if (!pathname || pathname === "/") return "/";
	return pathname.replace(/\/+$/, "");
};

export const getPageContext = (pathname: string) => {
	const normalized = normalizePathname(pathname);

	if (normalized === "/") {
		return { pageType: "home" } as const;
	}
	if (normalized === "/blog") {
		return { pageType: "blog_index", contentType: "blog" } as const;
	}
	if (normalized.startsWith("/blog/")) {
		return {
			pageType: "blog_post",
			contentType: "blog",
			slug: normalized.replace("/blog/", ""),
		} as const;
	}
	if (normalized === "/docs") {
		return { pageType: "docs_index", contentType: "doc" } as const;
	}
	if (normalized.startsWith("/docs/")) {
		return {
			pageType: "doc",
			contentType: "doc",
			slug: normalized.replace("/docs/", ""),
		} as const;
	}
	if (normalized.startsWith("/services/")) {
		return {
			pageType: "service",
			contentType: "service",
			slug: normalized.replace("/services/", ""),
		} as const;
	}
	if (normalized.startsWith("/products/")) {
		return {
			pageType: "product",
			contentType: "product",
			slug: normalized.replace("/products/", ""),
		} as const;
	}

	return { pageType: "other" } as const;
};

export const buildPageViewProperties = ({
	pathname,
	searchStr,
	hash,
	locale,
}: {
	pathname: string;
	searchStr: string;
	hash: string;
	locale: string;
}) => {
	const basePathname = stripLocaleFromPathname(pathname);
	const { pageType, contentType, slug } = getPageContext(basePathname);
	const utmParams = getUtmParams(searchStr);

	return omitUndefined({
		path: normalizePathname(basePathname),
		page_type: pageType,
		content_type: contentType,
		slug,
		locale,
		hash: hash ? hash.replace(/^#/, "") : undefined,
		...utmParams,
	});
};

const omitUndefined = <T extends Record<string, unknown>>(value: T) =>
	Object.fromEntries(
		Object.entries(value).filter(([, entry]) => entry !== undefined),
	) as {
		[K in keyof T]: Exclude<T[K], undefined>;
	};

export const useAnalytics = () => {
	const posthog = usePostHog();

	const capture = useCallback(
		(event: AnalyticsEventName, properties?: Record<string, unknown>) => {
			if (!posthog?.has_opted_in_capturing?.()) return;
			if (properties) {
				posthog.capture(event, properties);
			} else {
				posthog.capture(event);
			}
		},
		[posthog],
	);

	const register = useCallback(
		(properties: Record<string, unknown>) => {
			if (!posthog?.has_opted_in_capturing?.()) return;
			posthog.register(properties);
		},
		[posthog],
	);

	const registerOnce = useCallback(
		(properties: Record<string, unknown>) => {
			if (!posthog?.has_opted_in_capturing?.()) return;
			posthog.register_once(properties);
		},
		[posthog],
	);

	const canCapture = posthog?.has_opted_in_capturing?.() ?? false;

	return { posthog, capture, register, registerOnce, canCapture };
};

type SectionTracking = {
	id: string;
	label: string;
};

type SectionTrackingOptions = {
	pageType?: PageType;
	locale?: string;
};

export const useSectionViewTracking = (
	sections: SectionTracking[],
	{ pageType, locale }: SectionTrackingOptions = {},
) => {
	const { capture } = useAnalytics();
	const consentState = useAnalyticsConsentState();
	const sectionMap = useMemo(
		() => new Map(sections.map((section) => [section.id, section])),
		[sections],
	);

	useEffect(() => {
		if (consentState !== "granted") return;
		if (typeof window === "undefined") return;
		if (!("IntersectionObserver" in window)) return;
		if (sectionMap.size === 0) return;

		const seen = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const section = sectionMap.get(entry.target.id);
					if (!section || seen.has(section.id)) continue;

					seen.add(section.id);
					capture(
						ANALYTICS_EVENTS.sectionView,
						omitUndefined({
							section: section.label,
							section_id: section.id,
							page_type: pageType,
							locale,
						}),
					);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.5 },
		);

		for (const { id } of sectionMap.values()) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => observer.disconnect();
	}, [capture, consentState, sectionMap, pageType, locale]);
};

type ContentReadTrackingOptions = {
	contentType: "blog" | "doc";
	slug: string;
	title?: string;
	locale?: string;
};

export const useContentReadTracking = ({
	contentType,
	slug,
	title,
	locale,
}: ContentReadTrackingOptions) => {
	const { capture } = useAnalytics();
	const consentState = useAnalyticsConsentState();

	useEffect(() => {
		if (consentState !== "granted") return;
		if (typeof window === "undefined") return;
		if (!slug) return;

		const startedAt = Date.now();
		const tracked = new Set<number>();

		capture(
			ANALYTICS_EVENTS.contentView,
			omitUndefined({
				content_type: contentType,
				slug,
				title,
				locale,
			}),
		);

		const recordProgress = (threshold: number, progress: number) => {
			if (tracked.has(threshold) || progress < threshold) return;
			tracked.add(threshold);
			const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);

			capture(
				ANALYTICS_EVENTS.contentRead,
				omitUndefined({
					content_type: contentType,
					slug,
					title,
					locale,
					progress: threshold,
					elapsed_seconds: elapsedSeconds,
				}),
			);
		};

		const handleScroll = () => {
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			if (scrollHeight <= 0) return;
			const progress = window.scrollY / scrollHeight;

			recordProgress(0.5, progress);
			recordProgress(1, progress);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [capture, consentState, contentType, slug, title, locale]);
};
