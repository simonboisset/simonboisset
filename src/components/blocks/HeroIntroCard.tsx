import { Card } from "@/components/ui/card";
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
			<p className={cn("text-body-muted text-lg md:text-xl", className)}>
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
			<div className="image-frame inline-flex shrink-0 self-center p-2 sm:self-start">
				<span className="image-frame-overlay" aria-hidden="true" />
				<div className="relative size-20 shrink-0 overflow-hidden bg-muted md:size-24">
					<img
						src={heroPhotoUrl}
						alt={alt}
						className="image-treated h-full w-full object-cover"
					/>
				</div>
			</div>
			<Card
				variant="light"
				showPin={false}
				className="px-4 py-3 text-sm md:text-base"
			>
				{intro}
			</Card>
		</div>
	);
}
