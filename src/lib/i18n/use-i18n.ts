import { Route as RootRoute } from "@/routes/__root";
import { getTranslator } from "./index";
import {
	DEFAULT_LOCALE,
	localeToPathSegment,
	type Locale,
} from "./locale";

type LocaleContext = {
	locale: Locale;
	isLocalePrefixed: boolean;
};

export const useI18n = () => {
	const { locale, isLocalePrefixed } =
		RootRoute.useRouteContext<LocaleContext>();
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
