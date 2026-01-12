import { directus, type DocSummary } from "@/lib/directus";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/docs/")({
	component: DocsIndexPage,
	loader: ({ location, serverContext }) => {
		const locale = resolveLocaleForPath(location.pathname, serverContext);
		return directus.getDocs({ data: { locale } });
	},
});

function DocsIndexPage() {
	const docs = Route.useLoaderData();
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};

	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						{t((t) => t.docs.heroLabel)}
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						{t((t) => t.docs.heroTitle)}
					</h1>
					<p className="mt-4 text-lg text-slate-600">
						{t((t) => t.docs.heroDescription)}
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				{docs.length === 0 ? (
					<p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
						{t((t) => t.docs.empty)}
					</p>
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						{docs.map((doc) => (
							<DocsCard
								key={doc.slug}
								doc={doc}
								localeParams={localeParams}
							/>
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
		<Link
			to="/{-$locale}/docs/$slug"
			params={{ ...localeParams, slug: doc.slug }}
			className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
		>
			<h2 className="text-xl font-semibold text-slate-900">{doc.title}</h2>
			{description ? (
				<p className="mt-3 text-sm text-slate-600">{description}</p>
			) : null}
		</Link>
	);
}

function getDocDescription(slug: string, t: ReturnType<typeof useI18n>["t"]) {
	if (slug === "legal") return t((t) => t.docs.cardDescriptions.legal);
	if (slug === "privacy") return t((t) => t.docs.cardDescriptions.privacy);
	return "";
}
