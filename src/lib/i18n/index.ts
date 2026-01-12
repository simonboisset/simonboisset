import { createTranslator } from "typed-locale";
import { en } from "./en";
import { fr } from "./fr";
import type { Locale } from "./locale";

export const translations = {
	"en-US": en,
	"fr-FR": fr,
} satisfies Record<Locale, typeof en>;

export type Translations = typeof translations;

export const getTranslator = (locale: Locale) =>
	createTranslator(translations[locale]);
