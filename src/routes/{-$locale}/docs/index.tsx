import { createFileRoute } from "@tanstack/react-router";
import {
	ContentEmptyState,
	ContentHero,
	DocumentCardLink,
} from "@/components/blocks/editorial";
import { type DocSummary, directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/docs/")({
	component: DocsIndexPage,
	loader: async ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const docs = await directus.getDocs({ data: { locale } });
		return { docs, locale };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.docs.heroTitle),
			description: t((t) => t.docs.heroDescription),
			path: "/docs",
			locale: loaderData.locale,
		});
	},
});

function DocsIndexPage() {
	const { docs } = Route.useLoaderData();
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	return (
		<div className="terminal-page">
			<ContentHero
				label={t((t) => t.docs.heroLabel)}
				title={t((t) => t.docs.heroTitle)}
				description={t((t) => t.docs.heroDescription)}
				containerClassName="max-w-4xl"
				titleClassName="mt-4"
				descriptionClassName="mt-4"
			/>

			<section className="terminal-section mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
				{docs.length === 0 ? (
					<ContentEmptyState>{t((t) => t.docs.empty)}</ContentEmptyState>
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						{docs.map((doc: DocSummary) => (
							<DocsCard key={doc.slug} doc={doc} localeParams={localeParams} />
						))}
					</div>
				)}
			</section>
		</div>
	);
}

function DocsCard({
	doc,
	localeParams,
}: {
	doc: DocSummary;
	localeParams: Record<string, string>;
}) {
	const { t } = useI18n();
	const description = getDocDescription(doc.slug, t);

	return (
		<DocumentCardLink
			doc={doc}
			localeParams={localeParams}
			description={description}
			variant="grid"
		/>
	);
}

function getDocDescription(slug: string, t: ReturnType<typeof useI18n>["t"]) {
	if (slug === "legal") return t((t) => t.docs.cardDescriptions.legal);
	if (slug === "privacy") return t((t) => t.docs.cardDescriptions.privacy);
	return "";
}
