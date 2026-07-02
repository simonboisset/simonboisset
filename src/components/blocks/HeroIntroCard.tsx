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
			<p className={cn("terminal-muted text-lg md:text-xl", className)}>
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
			<div className="terminal-image-frame inline-flex shrink-0 self-center p-2 sm:self-start">
				<div className="size-20 shrink-0 overflow-hidden bg-muted md:size-24">
					<img
						src={heroPhotoUrl}
						alt={alt}
						className="terminal-image h-full w-full object-cover"
					/>
				</div>
			</div>
			<p className="terminal-card terminal-card-light px-4 py-3 text-sm md:text-base">
				{intro}
			</p>
		</div>
	);
}
