import { createFileRoute } from "@tanstack/react-router";
import { buildCvContent, CvDocument } from "@/components/blocks/CvDocument";
import { HERO_PHOTO_ASSET_ID } from "@/lib/constants";
import { directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/cv")({
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const heroPhotoUrl = await directus.getAssetUrl({
			data: HERO_PHOTO_ASSET_ID,
		});
		return { locale, heroPhotoUrl };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.seo.cvTitle),
			description: t((t) => t.seo.cvDescription),
			path: "/cv",
			locale: loaderData.locale,
		});
	},
	component: CvPage,
});

function CvPage() {
	const { locale } = useI18n();
	const { heroPhotoUrl } = Route.useLoaderData();
	const content = buildCvContent(locale);

	return <CvDocument content={content} heroPhotoUrl={heroPhotoUrl} />;
}
