import { createMiddleware, createStart } from "@tanstack/react-start";
import {
	getCookie,
	getRequestHeader,
	getRequestUrl,
	setCookie,
} from "@tanstack/react-start/server";
import {
	DEFAULT_LOCALE,
	LOCALE_COOKIE_NAME,
	extractLocaleFromPathname,
	getSafeLocale,
} from "@/lib/i18n/locale";

const localeMiddleware = createMiddleware().server(async ({ next }) => {
	const requestUrl = getRequestUrl();
	const pathname = requestUrl.pathname;
	const { locale: pathLocale } = extractLocaleFromPathname(pathname);

	const cookieLocale = getCookie(LOCALE_COOKIE_NAME);
	const headerLocale = getRequestHeader("accept-language")?.split(",")[0];

	const resolvedLocale = getSafeLocale(
		pathLocale ?? undefined,
		cookieLocale,
		headerLocale,
		DEFAULT_LOCALE,
	);

	setCookie(LOCALE_COOKIE_NAME, resolvedLocale, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
	});

	return next({ context: { locale: resolvedLocale } });
});

export const startInstance = createStart(() => ({
	requestMiddleware: [localeMiddleware],
}));
