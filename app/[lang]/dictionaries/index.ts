import 'server-only';
import z from 'zod';

const dictionaries = {
  en: () => import('./en.ts').then((module) => module.dictionary),
  fr: () => import('./fr.ts').then((module) => module.dictionary),
};
export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as [Locale];
export const localeSchema = z.enum(locales);

export const getDictionary = async (locale?: Locale) => dictionaries[locale || 'en']();

export const getSafeLocale = (...locales: string[]): Locale => {
  for (const maybeLocale of locales) {
    const locale = localeSchema.safeParse(maybeLocale);
    if (locale.success) {
      return locale.data;
    }
  }
  return 'en';
};
