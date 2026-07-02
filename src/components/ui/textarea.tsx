import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"placeholder:text-muted-foreground border-secondary bg-input flex field-sizing-content min-h-16 w-full rounded-lg border-2 px-3 py-2 text-base shadow-hard-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:border-destructive aria-invalid:ring-destructive/20",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
