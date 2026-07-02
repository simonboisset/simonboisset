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
				"testimonial-console mt-10 overflow-hidden p-0 motion-safe:animate-fade-up",
				className,
			)}
		>
			<div className="testimonial-console-bar">
				<span>feedback.recv</span>
				<span>
					{String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(testimonials.length).padStart(2, "0")}
				</span>
			</div>
			<div className="testimonial-console-body p-6 md:p-8 lg:p-10">
				<figure
					className="testimonial-console-screen"
					aria-label={`${activeTestimonial.name}: ${activeTestimonial.quote}`}
				>
					<figcaption className="testimonial-console-name">
						{activeTestimonial.name}
					</figcaption>
					<blockquote className="testimonial-console-quote">
						<span>{visibleQuote}</span>
						{prefersReducedMotion ? null : (
							<span className="testimonial-console-caret" aria-hidden="true" />
						)}
					</blockquote>
				</figure>
			</div>
		</Card>
	);
}
