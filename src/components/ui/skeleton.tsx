import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"animate-pulse rounded-[var(--radius)] border-2 border-secondary/50 bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
