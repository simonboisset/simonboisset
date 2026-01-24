import { BookOpen, Home, Sparkles, type LucideIcon } from "lucide-react";
import type { Translator } from "typed-locale";
import type { Translations } from "@/lib/i18n/en";

type I18nTranslator = Translator<Translations>;

export interface NavItem {
	title: string;
	to: string;
	params?: Record<string, string>;
	icon?: LucideIcon;
	items?: NavSubItem[];
}

export interface NavSubItem {
	title: string;
	to: string;
	params?: Record<string, string>;
}

export const getNavigationItems = (
	t: I18nTranslator,
	localeParams: Record<string, string>,
): NavItem[] => [
	{
		title: t((t) => t.nav.home),
		to: "/{-$locale}",
		params: localeParams,
		icon: Home,
	},
	{
		title: t((t) => t.nav.saasStarter),
		to: "/{-$locale}/products/saas-starter-template",
		params: localeParams,
		icon: Sparkles,
	},
	{
		title: t((t) => t.nav.blog),
		to: "/{-$locale}/blog",
		params: localeParams,
		icon: BookOpen,
	},
];
