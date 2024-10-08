import { redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { DEFAULT_LANGUAGE, languageSchema } from "../i18n/translator";
import { en } from "./en";
import { fr } from "./fr";

const documents = {
  en,
  fr,
};

export const requireDocument = (params: Params) => {
  const { lang, docType } = params;
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(lang || DEFAULT_LANGUAGE);
  const mustRedirect = lang === DEFAULT_LANGUAGE || !successLang;

  const type = docType === "legal" ? "legal" : "privacy";
  if (mustRedirect) {
    throw redirect(`/${validLanguage}/docs/${docType}`);
  }
  const document = documents[validLanguage][type];

  return { document, lang: validLanguage };
};
