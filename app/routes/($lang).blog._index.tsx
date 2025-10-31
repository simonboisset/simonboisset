import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { getBlogPosts } from "~/lib/source";
import { DEFAULT_LANGUAGE, languageSchema, type Language } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang: rawLang } = params;
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(rawLang || DEFAULT_LANGUAGE);

  const mustRedirect = rawLang === DEFAULT_LANGUAGE || !successLang;
  const lang = validLanguage || DEFAULT_LANGUAGE;

  if (mustRedirect) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const posts = getBlogPosts(lang as Language);
  const latest = posts[0];

  if (!latest) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const slug = latest.slug;
  const url = getAppUrl({
    type: "blog",
    lang,
    slug,
    DEFAULT_LANGUAGE,
  });
  throw redirect(url);
};
