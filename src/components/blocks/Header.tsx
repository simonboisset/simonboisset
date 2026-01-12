import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, SCHEDULE_VISIO_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
	buildLocalizedPath,
	setLocaleCookie,
	stripLocaleFromPathname,
	type Locale,
} from "@/lib/i18n/locale";

export default function Header() {
	const router = useRouter();
	const { t, locale, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const pathname = router.state.location.pathname;
	const basePathname = stripLocaleFromPathname(pathname);
	const isBlogActive = basePathname.startsWith("/blog");

	const switchLocale = (nextLocale: Locale) => {
		if (nextLocale === locale) return;
		setLocaleCookie(nextLocale);
		const targetHref = buildLocalizedPath(
			pathname,
			router.state.location.search,
			router.state.location.hash,
			nextLocale,
		);
		router.navigate({ href: targetHref });
	};

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f6f1ea]/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/{-$locale}"
						params={localeParams}
						className="text-lg font-semibold tracking-tight text-slate-900"
					>
						{t((t) => t.nav.brand)}
					</Link>
					<span className="hidden text-xs uppercase tracking-[0.3em] text-slate-500 md:inline">
						{t((t) => t.nav.tagline)}
					</span>
				</div>
				<nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 md:gap-6">
					<Link to="/{-$locale}" hash="services" params={localeParams}>
						{t((t) => t.nav.services)}
					</Link>
					<Link to="/{-$locale}" hash="projects" params={localeParams}>
						{t((t) => t.nav.projects)}
					</Link>
					<Link to="/{-$locale}" hash="testimonials" params={localeParams}>
						{t((t) => t.nav.testimonials)}
					</Link>
					<Link
						to="/{-$locale}/blog"
						params={localeParams}
						className={isBlogActive ? "text-slate-900" : ""}
					>
						{t((t) => t.nav.blog)}
					</Link>
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						className="hover:text-slate-900"
					>
						{t((t) => t.footer.github)}
					</a>
				</nav>
				<div className="flex flex-wrap items-center gap-3">
					<Button asChild size="sm">
						<a href={SCHEDULE_VISIO_URL} target="_blank" rel="noreferrer">
							{t((t) => t.nav.bookCall)}
						</a>
					</Button>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => switchLocale("fr-FR")}
							className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								locale === "fr-FR"
									? "border-slate-900 bg-slate-900 text-white"
									: "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
							}`}
						>
							FR
						</button>
						<button
							type="button"
							onClick={() => switchLocale("en-US")}
							className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
								locale === "en-US"
									? "border-slate-900 bg-slate-900 text-white"
									: "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
							}`}
						>
							EN
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
