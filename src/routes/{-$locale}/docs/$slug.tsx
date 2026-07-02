import { createFileRoute, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import { ContentHero, DocumentCardLink } from "@/components/blocks/editorial";
import MarkdownContent from "@/components/blocks/MarkdownContent";
import { Card } from "@/components/ui/card";
import { useContentReadTracking } from "@/lib/analytics";
import { type DocSummary, directus } from "@/lib/directus";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo, stripHtml, toExcerpt } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/docs/$slug")({
	component: DocsDetailPage,
	loader: async ({ params, location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		const [doc, docs] = await Promise.all([
			directus.getDoc({ data: { slug: params.slug, locale } }),
			directus.getDocs({ data: { locale } }),
		]);

		if (!doc) {
			throw notFound();
		}

		const contentHtml = await marked.parse(doc.content);
		return { doc, contentHtml, docs, locale };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		const descriptionFallback = t((t) => t.docs.heroDescription);
		const contentText = stripHtml(loaderData.contentHtml);
		const description = contentText
			? toExcerpt(contentText)
			: descriptionFallback;

		return buildSeo({
			title: loaderData.doc.title,
			description,
			path: `/docs/${loaderData.doc.slug}`,
			locale: loaderData.locale,
			type: "article",
		});
	},
});

function DocsDetailPage() {
	const { doc, contentHtml, docs } = Route.useLoaderData();
	const { t, locale, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const otherDocs = docs.filter((item: DocSummary) => item.slug !== doc.slug);

	useContentReadTracking({
		contentType: "doc",
		slug: doc.slug,
		title: doc.title,
		locale,
	});

	return (
		<>
			<ContentHero
				label={t((t) => t.docs.heroLabel)}
				title={doc.title}
				containerClassName="max-w-4xl"
				titleClassName="mt-4"
			>
				{doc.updatedAtLabel ? (
					<p className="text-kicker mt-4 text-sm">
						{t((t) => t.docs.effectiveDate)}: {doc.updatedAtLabel}
					</p>
				) : null}
			</ContentHero>

			<section className="section-divider mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
				<Card showPin={false} className="p-8">
					<MarkdownContent contentHtml={contentHtml} />
				</Card>

				{otherDocs.length > 0 ? (
					<div className="mt-10 grid gap-4 md:grid-cols-2">
						{otherDocs.map((item: DocSummary) => (
							<DocumentCardLink
								key={item.slug}
								doc={item}
								localeParams={localeParams}
								variant="compact"
							/>
						))}
					</div>
				) : null}
			</section>
		</>
	);
}
