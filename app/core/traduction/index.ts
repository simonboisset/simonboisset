import { en } from './en';
import { fr } from './fr';
export type Language = 'fr' | 'en';

export const traduction = { fr, en };
export const languages = Object.keys(traduction) as Language[];
