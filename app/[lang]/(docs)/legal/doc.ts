import 'server-only';
import { Locale } from '../../dictionaries';

export const getDoc = async (locale: Locale) => import(`./${locale}.md`).then((module) => module.default as string);
