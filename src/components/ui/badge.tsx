import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-lg border-2 border-current px-2.5 py-1 text-xs leading-tight uppercase shadow-hard-sm",
	{
		variants: {
			variant: {
				default: "bg-card/85 text-secondary",
				light: "bg-background text-secondary",
				accent: "bg-card/85 text-accent",
				foreground: "bg-card/85 text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
