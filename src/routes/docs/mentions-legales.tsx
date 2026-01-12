import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/mentions-legales")({
	component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Documents
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						Mentions légales
					</h1>
					<p className="mt-4 text-lg text-slate-600">
						Informations relatives à l'éditeur, l'hébergeur et les conditions
						d'utilisation.
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="prose max-w-none text-slate-700 prose-headings:text-slate-900">
						<h2>Éditeur de l'application</h2>
						<ul>
							<li>Société : Lezo (EURL)</li>
							<li>RCS : 921 329 025 R.C.S. Nantes</li>
							<li>Capital social : 100 euro</li>
							<li>TVA intracommunautaire : FR 23 921329025</li>
							<li>
								Adresse : 21 boulevard Auguste Pageot
								<br />
								44000 Nantes
								<br />
								France
							</li>
						</ul>

						<h2>Hébergement</h2>
						<p>
							Le site est hébergé par Lezo (auto-hébergé) à l'adresse suivante :
							<br />
							21 boulevard Auguste Pageot
							<br />
							44000 Nantes
							<br />
							France
						</p>

						<h2>Directeur de la publication</h2>
						<p>Simon Boisset.</p>

						<h2>Propriété intellectuelle</h2>
						<p>
							L'ensemble des contenus (textes, visuels, marques, logos) est
							protégé par le droit de la propriété intellectuelle. Toute
							reproduction ou utilisation non autorisée est interdite.
						</p>

						<h2>Responsabilité</h2>
						<p>
							L'éditeur met en oeuvre tous les moyens raisonnables pour assurer
							la fiabilité des informations publiées. Il ne peut toutefois pas
							garantir l'absence d'erreurs ou d'omissions.
						</p>

						<h2>Contact</h2>
						<p>
							Pour toute question, vous pouvez ecrire a{" "}
							<a href="mailto:support@lezo.dev">support@lezo.dev</a>.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
