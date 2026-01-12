import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/politique-confidentialite")({
	component: PolitiqueConfidentialitePage,
});

function PolitiqueConfidentialitePage() {
	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Documents
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						Politique de confidentialité
					</h1>
					<p className="mt-4 text-lg text-slate-600">
						Informations sur la collecte, l'usage et la protection des données.
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="prose max-w-none text-slate-700 prose-headings:text-slate-900">
						<h2>Responsable du traitement</h2>
						<p>
							Le responsable du traitement des données est l'éditeur de
							l'application : Lezo (EURL), 21 boulevard Auguste Pageot, 44000
							Nantes, France.
						</p>

						<h2>DPO</h2>
						<p>
							Vous pouvez contacter le délégué à la protection des données (DPO)
							Simon Boisset à l'adresse{" "}
							<a href="mailto:support@lezo.dev">support@lezo.dev</a>.
						</p>

						<h2>Données collectées</h2>
						<p>
							Les données collectées sont strictement nécessaires pour répondre
							aux demandes de contact et organiser les rendez-vous.
						</p>
						<ul>
							<li>Identité (nom, société)</li>
							<li>Coordonnées (email, téléphone si fourni)</li>
							<li>Informations liées à votre projet</li>
							<li>
								Données de navigation (pages visitées, appareil, source de trafic)
								en cas de consentement analytics
							</li>
						</ul>

						<h2>Finalités</h2>
						<ul>
							<li>Répondre aux demandes de contact</li>
							<li>Organiser les rendez-vous</li>
							<li>Suivre les demandes commerciales</li>
							<li>Mesurer l'audience et améliorer le site (avec consentement)</li>
						</ul>

						<h2>Base légale</h2>
						<p>
							Le traitement est fondé sur l'intérêt légitime à répondre aux
							demandes et sur l'exécution de mesures précontractuelles. Les
							traitements analytics reposent sur votre consentement.
						</p>

						<h2>Conservation</h2>
						<p>
							Les données sont conservées pendant une durée maximale de 3 ans à
							compter du dernier contact, sauf obligation légale contraire.
						</p>

						<h2>Partage des données</h2>
						<p>
							Aucune donnée personnelle n'est vendue ou partagée avec des tiers,
							hors obligations légales ou nécessité de fourniture du service de
							rendez-vous.
						</p>

						<h2>Sous-traitants</h2>
						<p>
							Le service de prise de rendez-vous est opéré par Google (Google
							Calendar). Ce prestataire peut traiter des données en dehors de
							l'Union européenne.{" "}
							<a
								href="https://policies.google.com/privacy"
								target="_blank"
								rel="noreferrer"
							>
								Politique de confidentialité de Google
							</a>
							.
						</p>
						<p>
							Les mesures d'audience sont réalisées avec PostHog (hébergement
							UE).{" "}
							<a
								href="https://posthog.com/privacy"
								target="_blank"
								rel="noreferrer"
							>
								Politique de confidentialité de PostHog
							</a>
							.
						</p>

						<h2>Vos droits</h2>
						<p>
							Vous disposez d'un droit d'accès, de rectification, d'opposition,
							d'effacement et de portabilité. Pour exercer ces droits, merci
							de nous contacter a{" "}
							<a href="mailto:support@lezo.dev">support@lezo.dev</a>.
						</p>
						<p>
							Vous pouvez également introduire une réclamation auprès de la CNIL
							(
							<a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
								www.cnil.fr
							</a>
							).
						</p>

						<h2>Cookies et traceurs</h2>
						<p>
							Le site n'installe pas de cookies publicitaires. Des cookies
							techniques peuvent être déposés par le service de prise de
							rendez-vous de Google pour assurer son bon fonctionnement. Les
							cookies analytics PostHog ne sont activés qu'après consentement.
						</p>

						<h2>Sécurité</h2>
						<p>
							Les mesures techniques et organisationnelles appropriées sont mises
							en oeuvre pour protéger les données contre l'accès non autorisé ou
							la perte.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
