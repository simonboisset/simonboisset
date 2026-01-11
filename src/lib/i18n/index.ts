import { createTranslator } from "typed-locale";
import { en } from "./en";
import { fr } from "./fr";

const translations = {
	"en-US": en,
	"fr-FR": fr,
};

export type Translations = typeof translations;
export type Locale = keyof Translations;
export const getT = (locale: Locale) => createTranslator(translations[locale]);
// example usage:
const t = getT("en-US");
t((t) => t.hello({ name: "John" })); // "Hello John"
