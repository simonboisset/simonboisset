import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/blocks/home/HomePage";
import {
	HERO_PHOTO_ASSET_ID,
	SITE_ILLUSTRATION_ASSET_IDS,
} from "@/lib/constants";
import { directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import {
	buildPersonStructuredData,
	buildProfessionalServiceStructuredData,
	buildSeo,
} from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/")({
	component: App,
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const [
			heroPhotoUrl,
			heroIllustrationUrl,
			proofIllustrationUrl,
			legacyServiceIllustrationUrl,
			workflowServiceIllustrationUrl,
		] = await Promise.all([
			directus.getAssetUrl({
				data: HERO_PHOTO_ASSET_ID,
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.hero,
					width: 960,
					height: 640,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.proof,
					width: 880,
					height: 520,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.legacyService,
					width: 760,
					height: 500,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
			directus.getAssetUrl({
				data: {
					assetId: SITE_ILLUSTRATION_ASSET_IDS.workflowService,
					width: 760,
					height: 500,
					fit: "cover",
					format: "webp",
					quality: 82,
				},
			}),
		]);
		return {
			heroIllustrationUrl,
			heroPhotoUrl,
			legacyServiceIllustrationUrl,
			locale,
			proofIllustrationUrl,
			workflowServiceIllustrationUrl,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.seo.homeTitle),
			description: t((t) => t.seo.homeDescription),
			path: "/",
			locale: loaderData.locale,
			structuredData: [
				buildPersonStructuredData(),
				buildProfessionalServiceStructuredData(loaderData.locale),
			],
		});
	},
});

function App() {
	const {
		heroIllustrationUrl,
		heroPhotoUrl,
		legacyServiceIllustrationUrl,
		proofIllustrationUrl,
		workflowServiceIllustrationUrl,
	} = Route.useLoaderData();

	return (
		<HomePage
			assets={{
				heroIllustrationUrl,
				heroPhotoUrl,
				legacyServiceIllustrationUrl,
				proofIllustrationUrl,
				workflowServiceIllustrationUrl,
			}}
		/>
	);
}
