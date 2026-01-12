import { cn } from "@/lib/utils";

type HeroIntroCardProps = {
	heroPhotoUrl?: string | null;
	intro: string;
	alt: string;
	className?: string;
};

export function HeroIntroCard({
	heroPhotoUrl,
	intro,
	alt,
	className,
}: HeroIntroCardProps) {
	if (!heroPhotoUrl) {
		return (
			<p className={cn("text-lg text-slate-600 md:text-xl", className)}>
				{intro}
			</p>
		);
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-4 sm:flex-row sm:items-start",
				className,
			)}
		>
			<div className="inline-flex self-center rounded-full border border-slate-200 bg-white/90 p-2 shadow-lg sm:self-start">
				<div className="size-20 overflow-hidden rounded-full bg-slate-100 md:size-24">
					<img
						src={heroPhotoUrl}
						alt={alt}
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
			<p className="rounded-[22px] rounded-bl-[8px] rounded-tr-[30px] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,248,240,0.92),rgba(236,248,246,0.9))] px-4 py-3 text-sm italic text-slate-600 shadow-sm md:text-base">
				{intro}
			</p>
		</div>
	);
}
