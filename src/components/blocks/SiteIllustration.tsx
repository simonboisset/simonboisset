import { cn } from "@/lib/utils";

type SiteIllustrationProps = {
	src?: string | null;
	alt?: string;
	className?: string;
	imageClassName?: string;
	priority?: boolean;
};

export function SiteIllustration({
	src,
	alt = "",
	className,
	imageClassName,
	priority = false,
}: SiteIllustrationProps) {
	if (!src) return null;

	return (
		<div className={cn("terminal-image-frame group p-2", className)}>
			<img
				src={src}
				alt={alt}
				loading={priority ? "eager" : "lazy"}
				decoding={priority ? "sync" : "async"}
				fetchPriority={priority ? "high" : "auto"}
				className={cn(
					"terminal-image h-full w-full object-cover",
					imageClassName,
				)}
			/>
		</div>
	);
}
