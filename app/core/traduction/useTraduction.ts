import type { Language } from '.';
import { traduction } from '.';

export const useTraduction = () => {
  const lang = 'fr' as Language;
  return { t: traduction[lang], lang };
};
