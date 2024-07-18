import { z } from "zod";
import { en } from "./en";
import { fr } from "./fr";

const translations = { en, fr };
export type Language = keyof typeof translations;
const languages = Object.keys(translations) as Language[];
export const languageSchema = z.enum(languages as [Language]);

export const getTranslation = (lang?: Language) => translations[lang || "en"];

export const getSafeLanguage = (...langs: (string | undefined)[]): Language => {
  for (const lang of langs) {
    const validatedLang = languageSchema.safeParse(lang);
    if (validatedLang.success) {
      return validatedLang.data;
    }
  }
  return "en";
};
