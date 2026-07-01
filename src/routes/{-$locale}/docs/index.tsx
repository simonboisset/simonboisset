import { createFileRoute, Link } from "@tanstack/react-router";
import { ANALYTICS_EVENTS, useAnalytics } from "@/lib/analytics";
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
			<section className="terminal-hero">
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="terminal-label terminal-boot-line">
						{t((t) => t.docs.heroLabel)}
					</p>
					<h1 className="terminal-heading terminal-boot-line mt-4 text-4xl md:text-5xl">
						{t((t) => t.docs.heroTitle)}
					</h1>
					<p className="terminal-muted mt-4 text-lg">
						{t((t) => t.docs.heroDescription)}
					</p>
				</div>
			</section>

			<section className="terminal-section mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
				{docs.length === 0 ? (
					<p className="terminal-card p-8 text-center">
						{t((t) => t.docs.empty)}
					</p>
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
	const { capture } = useAnalytics();
	const description = getDocDescription(doc.slug, t);

	return (
		<Link
			to="/{-$locale}/docs/$slug"
			params={{ ...localeParams, slug: doc.slug }}
			className="terminal-card p-8 transition hover:no-underline"
			onClick={() =>
				capture(ANALYTICS_EVENTS.contentClick, {
					content_type: "doc",
					slug: doc.slug,
					title: doc.title,
					placement: "docs_list",
				})
			}
		>
			<h2 className="terminal-heading pr-8 text-xl">{doc.title}</h2>
			{description ? (
				<p className="terminal-muted mt-3 text-sm">{description}</p>
			) : null}
		</Link>
	);
}

function getDocDescription(slug: string, t: ReturnType<typeof useI18n>["t"]) {
	if (slug === "legal") return t((t) => t.docs.cardDescriptions.legal);
	if (slug === "privacy") return t((t) => t.docs.cardDescriptions.privacy);
	return "";
}
