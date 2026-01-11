import { type InferTranslation } from "typed-locale";

export const en = {
	hello: "Hello {{name}}",
} as const;

export type Translations = InferTranslation<typeof en>;
