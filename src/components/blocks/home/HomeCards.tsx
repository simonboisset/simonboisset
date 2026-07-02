import { CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteIllustration } from "@/components/blocks/SiteIllustration";
import type { RiskCard as RiskCardData } from "./types";

const RiskCardBody = ({ risk }: { risk: RiskCardData }) => (
	<>
		<div className="flex items-center justify-between">
			<h3 className="terminal-heading pr-8 text-lg">{risk.title}</h3>
			<ShieldCheck className="size-5 text-secondary" />
		</div>
		<p className="terminal-muted mt-3 text-sm">{risk.description}</p>
		<p className="terminal-muted mt-5 flex items-start gap-2 text-sm">
			<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
			{risk.bullet}
		</p>
	</>
);

export function RiskCard({
	risk,
	index,
}: {
	risk: RiskCardData;
	index: number;
}) {
	if (risk.illustrationUrl) {
		return (
			<article
				className="terminal-card grid overflow-hidden p-3 motion-safe:animate-fade-up md:grid-cols-[0.8fr_1fr]"
				style={{ animationDelay: `${index * 120}ms` }}
			>
				<SiteIllustration
					src={risk.illustrationUrl}
					className="box-border aspect-[3/2] min-w-0 max-w-full self-stretch justify-self-stretch"
				/>
				<div className="flex flex-col p-3 pt-5 md:p-5">
					<RiskCardBody risk={risk} />
				</div>
			</article>
		);
	}

	return (
		<div
			className="terminal-card p-6 motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<RiskCardBody risk={risk} />
		</div>
	);
}
