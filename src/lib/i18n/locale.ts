import { z } from "zod";

export const localeSchema = z.enum(["en-US", "fr-FR"]);
export type Locale = z.infer<typeof localeSchema>;

export const localeSegmentSchema = z.enum(["en", "fr"]);
export type LocaleSegment = z.infer<typeof localeSegmentSchema>;

export const DEFAULT_LOCALE: Locale = "fr-FR";
export const LOCALE_COOKIE_NAME = "siteLocale";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const localeCandidateRegex = /^[a-z]{2}(?:-[a-z]{2})?$/i;

export const localeToPathSegment = (locale: Locale): LocaleSegment =>
	locale.startsWith("fr") ? "fr" : "en";

export const mapLocaleInput = (value?: string | null): Locale | null => {
	if (!value) return null;

	const direct = localeSchema.safeParse(value);
	if (direct.success) return direct.data;

	const lowered = value.toLowerCase();
	if (lowered === "fr" || lowered.startsWith("fr-")) return "fr-FR";
	if (lowered === "en" || lowered.startsWith("en-")) return "en-US";

	return null;
};

export const getSafeLocale = (...candidates: (string | null | undefined)[]) => {
	for (const candidate of candidates) {
		const mapped = mapLocaleInput(candidate);
		if (mapped) return mapped;
	}
	return DEFAULT_LOCALE;
};

export const extractLocaleFromPathname = (pathname: string) => {
	const segments = pathname.split("/").filter(Boolean);
	const firstSegment = segments[0];

	if (!firstSegment || !localeCandidateRegex.test(firstSegment)) {
		return { segment: null, locale: null };
	}

	return {
		segment: firstSegment,
		locale: mapLocaleInput(firstSegment),
	};
};

export const stripLocaleFromPathname = (pathname: string) => {
	const { segment } = extractLocaleFromPathname(pathname);
	if (!segment) return pathname;

	const segments = pathname.split("/").filter(Boolean).slice(1);
	if (segments.length === 0) return "/";

	return `/${segments.join("/")}`;
};

export const addLocaleToPathname = (pathname: string, locale: Locale) => {
	const normalized = pathname === "/" ? "" : pathname.replace(/^\/+/, "");
	const segment = localeToPathSegment(locale);
	return `/${segment}${normalized ? `/${normalized}` : ""}`;
};

export const buildPath = (pathname: string, search?: string, hash?: string) => {
	const searchPart = search && search.length > 0 ? search : "";
	const hashPart = hash && hash.length > 0 ? hash : "";
	return `${pathname}${searchPart}${hashPart}`;
};

export const getClientLocaleFromCookie = (): Locale | null => {
	if (typeof document === "undefined") return null;
	const rawCookie = document.cookie
		.split(";")
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith(`${LOCALE_COOKIE_NAME}=`));
	if (!rawCookie) return null;

	const value = rawCookie.slice(`${LOCALE_COOKIE_NAME}=`.length);
	return mapLocaleInput(decodeURIComponent(value));
};

export const setLocaleCookie = (locale: Locale) => {
	if (typeof document === "undefined") return;
	const value = encodeURIComponent(locale);
	document.cookie = `${LOCALE_COOKIE_NAME}=${value}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
};

export const readServerLocale = (serverContext: unknown) => {
	if (typeof serverContext !== "object" || serverContext === null) {
		return undefined;
	}
	if (!("locale" in serverContext)) return undefined;
	const localeValue = (serverContext as { locale?: unknown }).locale;
	return typeof localeValue === "string" ? localeValue : undefined;
};

export const resolveLocaleForPath = (
	pathname: string,
	serverContext: unknown,
) => {
	const { locale: pathLocale } = extractLocaleFromPathname(pathname);
	const serverLocale = readServerLocale(serverContext);
	const clientLocale = getClientLocaleFromCookie();
	return getSafeLocale(pathLocale ?? undefined, serverLocale, clientLocale);
};

export const buildLocalizedPath = (
	pathname: string,
	search: string | undefined,
	hash: string | undefined,
	locale: Locale,
) => {
	const basePathname = stripLocaleFromPathname(pathname);
	const targetPathname =
		locale === DEFAULT_LOCALE ? basePathname : addLocaleToPathname(basePathname, locale);
	return buildPath(targetPathname, search, hash);
};
