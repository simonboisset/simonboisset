import {
	DEFAULT_LOCALE,
	addLocaleToPathname,
	buildPath,
	resolveLocaleForPath,
} from "@/lib/i18n/locale";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/{-$locale}/docs/politique-confidentialite",
)({
	loader: ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const basePath = "/docs/privacy";
		const targetPathname =
			locale === DEFAULT_LOCALE
				? basePath
				: addLocaleToPathname(basePath, locale);
		throw redirect({
			href: buildPath(targetPathname, location.searchStr, location.hash),
		});
	},
	component: () => null,
});
