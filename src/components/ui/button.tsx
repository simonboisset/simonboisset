import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-current text-sm font-medium uppercase tracking-[0.08em] shadow-hard-button outline-none transition-[color,background-color,box-shadow,transform] duration-150 ease-linear hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--shadow-hard)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/60 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"border-primary bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
				destructive:
					"border-destructive bg-destructive text-destructive-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-destructive/30",
				outline:
					"border-secondary bg-background text-secondary hover:bg-secondary hover:text-secondary-foreground",
				secondary:
					"border-secondary bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
				ghost:
					"border-transparent bg-transparent text-secondary shadow-none hover:border-secondary hover:bg-muted hover:text-secondary",
				link: "border-transparent bg-transparent text-secondary shadow-none underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:text-accent hover:underline hover:shadow-none",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
				lg: "h-11 px-6 text-base has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
