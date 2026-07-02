import { CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteIllustration } from "@/components/blocks/SiteIllustration";
import type { OfferTrack, RiskCard as RiskCardContent } from "./types";

export function RiskCard({
	risk,
	index,
}: {
	risk: RiskCardContent;
	index: number;
}) {
	return (
		<div
			className="terminal-card p-6 motion-safe:animate-fade-up"
			style={{ animationDelay: `${index * 120}ms` }}
		>
			<div className="flex items-center justify-between">
				<h3 className="terminal-heading pr-8 text-lg">{risk.title}</h3>
				<ShieldCheck className="size-5 text-secondary" />
			</div>
			<p className="terminal-muted mt-3 text-sm">{risk.description}</p>
			<p className="terminal-muted mt-5 flex items-start gap-2 text-sm">
				<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
				{risk.bullet}
			</p>
		</div>
	);
}

export function OfferTrackCard({
	track,
	index,
}: {
	track: OfferTrack;
	index: number;
}) {
	return (
		<article
			className="terminal-card grid overflow-hidden p-3 motion-safe:animate-fade-up md:grid-cols-[0.8fr_1fr] lg:grid-cols-1"
			style={{ animationDelay: `${(index + 4) * 120}ms` }}
		>
			<SiteIllustration
				src={track.illustrationUrl}
				className="box-border aspect-[3/2] min-w-0 max-w-full self-stretch justify-self-stretch"
			/>
			<div className="flex flex-col p-3 pt-5 md:p-5 lg:p-3 lg:pt-5">
				<p className="terminal-label">{track.label}</p>
				<h3 className="terminal-heading mt-3 text-xl">{track.title}</h3>
				<p className="terminal-muted mt-3 text-sm">{track.description}</p>
				<ul className="mt-5 grid gap-3 text-sm">
					{track.bullets.map((bullet) => (
						<li key={bullet} className="terminal-muted flex items-start gap-2">
							<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
							<span>{bullet}</span>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}
