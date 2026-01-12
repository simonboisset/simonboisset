import { Route as RootRoute } from "@/routes/__root";
import { getTranslator } from "./index";
import { DEFAULT_LOCALE, localeToPathSegment } from "./locale";

export const useI18n = () => {
	const { locale, isLocalePrefixed } = RootRoute.useRouteContext();
	const translator = getTranslator(locale);
	const shouldPrefix = isLocalePrefixed || locale !== DEFAULT_LOCALE;
	const localeParam = shouldPrefix ? localeToPathSegment(locale) : undefined;

	return {
		locale,
		isLocalePrefixed,
		localeParam,
		t: translator,
	};
};
