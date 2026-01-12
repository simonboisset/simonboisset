import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/legal")({
	component: LegalDocsPage,
});

function LegalDocsPage() {
	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(246,241,234,0.9)_60%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-slate-500">
						Documentation
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
						Legal documents
					</h1>
					<p className="mt-4 text-lg text-slate-600">
						Plain-language policies for privacy, data usage, and service terms.
					</p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-6 pb-20">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="prose max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-teal-700">
						<h2>Privacy policy</h2>
						<p>
							This site collects only the information needed to respond to project
							inquiries. Emails sent to <a href="mailto:hello@simonboisset.dev">
								hello@simonboisset.dev
							</a>{" "}
							are stored securely and used solely to reply or follow up on
							project requests.
						</p>
						<ul>
							<li>No advertising trackers or third-party data sharing.</li>
							<li>Analytics, if enabled, are used only to improve content quality.</li>
							<li>You can request deletion of any stored communication.</li>
						</ul>

						<h2>Terms of service</h2>
						<p>
							Engagements are scoped via written proposals or statements of work.
							Payment terms, milestones, and deliverables are documented before
							work begins.
						</p>
						<ul>
							<li>All deliverables remain the client's property upon payment.</li>
							<li>Scope changes are reviewed and approved in writing.</li>
							<li>Support coverage and response times are agreed per project.</li>
						</ul>

						<h2>Cookies</h2>
						<p>
							This site uses only essential cookies required for platform
							operation. No tracking or advertising cookies are used by default.
						</p>

						<h2>Company details</h2>
						<p>
							Freelance developer based in France. For formal requests, reach out
							via email.
						</p>
						<p>
							Need a legal copy for your procurement team?{" "}
							<a href="mailto:hello@simonboisset.dev">Contact me</a> and I'll
							provide a signed PDF.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
