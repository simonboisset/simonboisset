import { cn } from "@/lib/utils";

export function SiteIllustration({
	src,
	alt = "",
	className,
	priority = false,
}: {
	src: string | null;
	alt?: string;
	className?: string;
	priority?: boolean;
}) {
	return (
		<div className={cn("image-frame group p-2", className)}>
			<span className="image-frame-overlay" aria-hidden="true" />
			{src ? (
				<img
					src={src}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
					className={cn(
						"image-treated relative h-full w-full object-cover group-hover:scale-[1.025] group-hover:saturate-[0.95] group-hover:contrast-[1.28]",
					)}
				/>
			) : (
				<div className="relative h-full w-full bg-muted" aria-hidden="true" />
			)}
		</div>
	);
}
