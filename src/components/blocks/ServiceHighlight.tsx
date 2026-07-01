import type React from "react";

type ServiceHighlightProps = {
	title: string;
	description: string;
	icon: React.ReactNode;
};

export function ServiceHighlight({
	title,
	description,
	icon,
}: ServiceHighlightProps) {
	return (
		<div className="terminal-card h-full p-6">
			<div className="flex items-center gap-3">
				<span className="terminal-chip p-2 text-secondary">{icon}</span>
				<h3 className="terminal-heading text-lg">{title}</h3>
			</div>
			<p className="terminal-muted mt-4 text-sm">{description}</p>
		</div>
	);
}
