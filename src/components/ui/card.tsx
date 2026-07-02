import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
	"group/card relative rounded-lg border-2 text-card-foreground shadow-hard-md transition-[transform,box-shadow,border-color,background-color] duration-150 ease-[steps(2,end)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:shadow-hard-lg",
	{
		variants: {
			variant: {
				default:
					"border-secondary/60 bg-card/92 hover:border-secondary focus-within:border-secondary",
				light:
					"border-accent bg-foreground text-background hover:border-accent focus-within:border-accent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const CardPin = () => (
	<span
		className="pointer-events-none absolute top-3.5 right-4 h-[0.9rem] w-[0.65rem] opacity-0 transition-opacity duration-150 ease-[steps(2,end)] group-hover/card:opacity-100 group-focus-within/card:opacity-100"
		aria-hidden="true"
	>
		<span className="absolute top-[0.35rem] left-0 h-[0.16rem] w-[0.65rem] bg-accent" />
		<span className="absolute top-[0.2rem] left-[0.45rem] size-[0.16rem] bg-accent" />
		<span className="absolute top-[0.5rem] left-[0.45rem] size-[0.16rem] bg-accent" />
	</span>
);

function Card({
	className,
	variant = "default",
	showPin = true,
	children,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof cardVariants> & { showPin?: boolean }) {
	return (
		<div
			data-slot="card"
			data-variant={variant}
			className={cn(cardVariants({ variant }), className)}
			{...props}
		>
			{showPin ? <CardPin /> : null}
			{children}
		</div>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn("flex flex-col gap-1.5 p-6", className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-foreground text-lg font-normal leading-[0.98] text-balance",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm leading-relaxed", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("p-6 pt-0", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center p-6 pt-0", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardPin,
	CardTitle,
	cardVariants,
};
