import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSafeLanguage } from "~/domains/i18n";
import {
  ArticleKey,
  articles,
  extractArticleInfosfromMd,
} from "../$lang.blog.$articleSlug/articles";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const lang = getSafeLanguage(params.lang);

  const articlesList = [];

  for (const key in articles) {
    if (Object.hasOwnProperty.call(articles, key)) {
      const article = articles[key as ArticleKey];
      const Article = article[lang];
      const config = extractArticleInfosfromMd(Article);
      articlesList.push({ ...config, slug: key });
    }
  }

  articlesList.sort((a, b) => b.date.getTime() - a.date.getTime());
  throw redirect(`/${lang}/blog/${articlesList[0].slug}`, { status: 301 });
};
