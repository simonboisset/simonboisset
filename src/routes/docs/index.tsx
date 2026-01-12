import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
	component: DocsIndexPage,
});

function DocsIndexPage() {
	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Documents
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						Documentation légale
					</h1>
					<p className="mt-4 text-lg text-slate-600">
						Retrouvez les documents obligatoires et informations légales.
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				<div className="grid gap-6 md:grid-cols-2">
					<Link
						to="/docs/mentions-legales"
						className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
					>
						<h2 className="text-xl font-semibold text-slate-900">
							Mentions légales
						</h2>
						<p className="mt-3 text-sm text-slate-600">
							Informations sur l'éditeur, l'hébergement et les contacts.
						</p>
					</Link>
					<Link
						to="/docs/politique-confidentialite"
						className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
					>
						<h2 className="text-xl font-semibold text-slate-900">
							Politique de confidentialité
						</h2>
						<p className="mt-3 text-sm text-slate-600">
							Détails sur les données collectées et vos droits.
						</p>
					</Link>
				</div>
			</section>
		</div>
	);
}
