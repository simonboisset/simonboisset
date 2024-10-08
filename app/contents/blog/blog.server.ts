import { redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { DEFAULT_LANGUAGE, Language, languageSchema } from "../i18n/translator";
import { getAppUrl } from "../navigation/get-url";
import { en } from "./en";
import { fr } from "./fr";

export const blog = { en, fr };
export type LinkTree = {
  href: string;
  title: string;
  slug: string;
  date: Date;
};

export const getTitle = (doc: string) => {
  return doc.split("\n")[0].replace("# ", "");
};

export const getBlogPosts = (lang: Language): LinkTree[] => {
  return blog[lang]
    .map((post) => ({
      href: getAppUrl({
        DEFAULT_LANGUAGE,
        lang,
        type: "blog",
        slug: post.slug,
      }),
      title: getTitle(post.content),
      slug: post.slug,
      date: post.date,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getBlogContent = (slug: string, lang: Language) => {
  return blog[lang].find((post) => post.slug === slug);
};

export const requireBlogPost = (params: Params) => {
  const { lang, slug } = params;
  const redirectUrl = getAppUrl({
    type: "blog",
    lang,
    slug,
    DEFAULT_LANGUAGE,
  });
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(lang || DEFAULT_LANGUAGE);
  const mustRedirect = lang === DEFAULT_LANGUAGE || !successLang;

  if (mustRedirect) {
    throw redirect(redirectUrl);
  }

  const posts = getBlogPosts(validLanguage);
  if (!posts) {
    throw redirect(
      getAppUrl({
        type: "blog",
        lang: validLanguage,
        DEFAULT_LANGUAGE,
      })
    );
  }

  return { posts, lang: validLanguage };
};
