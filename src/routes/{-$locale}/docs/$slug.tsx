import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import MarkdownContent from "@/components/blocks/MarkdownContent";
import { directus, type DocSummary } from "@/lib/directus";
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
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const otherDocs = docs.filter((item: DocSummary) => item.slug !== doc.slug);

	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						{t((t) => t.docs.heroLabel)}
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						{doc.title}
					</h1>
					{doc.updatedAtLabel ? (
						<p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
							{t((t) => t.docs.effectiveDate)}: {doc.updatedAtLabel}
						</p>
					) : null}
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<MarkdownContent contentHtml={contentHtml} />
				</div>

				{otherDocs.length > 0 ? (
					<div className="mt-10 grid gap-4 md:grid-cols-2">
						{otherDocs.map((item: DocSummary) => (
							<Link
								key={item.slug}
								to="/{-$locale}/docs/$slug"
								params={{ ...localeParams, slug: item.slug }}
								className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm transition hover:shadow-md"
							>
								{item.title}
							</Link>
						))}
					</div>
				) : null}
			</section>
		</div>
	);
}
