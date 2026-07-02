import { useMemo } from "react";
import { useAnalytics, useSectionViewTracking } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildHomeContent } from "./content";
import {
	HomeFinalCta,
	HomeHeroSection,
	HomeMethodSection,
	HomeServicesSection,
	HomeTestimonialsSection,
} from "./HomeSections";
import type { HomeAssets } from "./types";

export function HomePage({ assets }: { assets: HomeAssets }) {
	const { t, locale, localeParam } = useI18n();
	const { capture } = useAnalytics();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const sectionTracking = useMemo(
		() => [
			{ id: "services", label: "risks" },
			{ id: "testimonials", label: "testimonials" },
			{ id: "process", label: "process" },
		],
		[],
	);
	const content = buildHomeContent(t, assets);

	useSectionViewTracking(sectionTracking, { pageType: "home", locale });

	return (
		<>
			<HomeHeroSection
				assets={assets}
				content={content.hero}
				localeParams={localeParams}
				capture={capture}
				brandAlt={t((t) => t.nav.brand)}
			/>
			<HomeServicesSection content={content} />
			<HomeTestimonialsSection assets={assets} content={content} />
			<HomeMethodSection content={content} />
			<HomeFinalCta content={content.cta} capture={capture} />
		</>
	);
}
