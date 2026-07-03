import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "./types";

export function TestimonialConsole({
	testimonials,
	className,
}: {
	testimonials: Testimonial[];
	className?: string;
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [visibleWords, setVisibleWords] = useState(1);
	const prefersReducedMotion = usePrefersReducedMotion();
	const activeTestimonial = testimonials[activeIndex] ??
		testimonials[0] ?? {
			name: "",
			quote: "",
		};
	const activeWords = activeTestimonial.quote.split(" ");
	const visibleQuote = prefersReducedMotion
		? activeTestimonial.quote
		: activeWords.slice(0, visibleWords).join(" ");

	useEffect(() => {
		if (prefersReducedMotion || testimonials.length <= 1) {
			setVisibleWords(activeWords.length);
			return;
		}

		const hasWrittenQuote = visibleWords >= activeWords.length;
		const hasClearedQuote = visibleWords === 0;
		const delay = hasWrittenQuote ? 2400 : hasClearedQuote ? 420 : 90;
		const timeout = window.setTimeout(() => {
			if (hasWrittenQuote) {
				setVisibleWords(0);
				return;
			}

			if (hasClearedQuote) {
				setActiveIndex((index) => (index + 1) % testimonials.length);
				setVisibleWords(1);
				return;
			}

			setVisibleWords((count) =>
				Math.max(1, Math.min(activeWords.length, count + 1)),
			);
		}, delay);

		return () => window.clearTimeout(timeout);
	}, [
		activeWords.length,
		prefersReducedMotion,
		testimonials.length,
		visibleWords,
	]);

	return (
		<Card
			showPin={false}
			className={cn(
				"isolate mt-10 overflow-hidden p-0 motion-safe:animate-fade-up",
				className,
			)}
		>
			<div className="flex items-center justify-between gap-4 border-b-2 border-b-[color:color-mix(in_srgb,var(--secondary)_42%,transparent)] bg-[color-mix(in_srgb,var(--background)_72%,var(--card))] px-4 py-[0.85rem] text-[0.72rem] leading-[1.4] tracking-[0.16em] text-accent uppercase">
				<span>feedback.recv</span>
				<span>
					{String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(testimonials.length).padStart(2, "0")}
				</span>
			</div>
			<div className="relative overflow-hidden p-6 md:p-8 lg:p-10">
				<span
					className="pointer-events-none absolute inset-0 opacity-35 [background:linear-gradient(color-mix(in_srgb,var(--secondary)_7%,transparent)_50%,transparent_50%)_0_0/100%_8px,radial-gradient(circle_at_8%_8%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_18rem)]"
					aria-hidden="true"
				/>
				<figure
					className="relative flex min-h-72 flex-col justify-center overflow-hidden md:min-h-64"
					aria-label={`${activeTestimonial.name}: ${activeTestimonial.quote}`}
				>
					<figcaption className="relative text-base leading-[1.2] text-secondary uppercase">
						{activeTestimonial.name}
					</figcaption>
					<blockquote className="relative mt-8 font-mono text-[1.05rem] leading-[1.75] text-pretty text-foreground md:text-xl">
						<span>{visibleQuote}</span>
						{prefersReducedMotion ? null : (
							<span
								className="ml-[0.16rem] inline-block h-[1em] w-[0.55ch] animate-cursor-blink bg-accent align-[-0.12em]"
								aria-hidden="true"
							/>
						)}
					</blockquote>
				</figure>
			</div>
		</Card>
	);
}
