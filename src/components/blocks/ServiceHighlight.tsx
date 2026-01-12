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
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-center gap-3">
				<span className="rounded-full bg-slate-100 p-2">{icon}</span>
				<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
			</div>
			<p className="mt-4 text-sm text-slate-600">{description}</p>
		</div>
	);
}
