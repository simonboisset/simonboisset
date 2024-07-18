import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getSafeLanguage } from "~/domains/i18n";
import { Button } from "~/ui/button";
import {
  ArticleKey,
  articles,
  extractArticleInfosfromMd,
} from "../$lang.blog.$articleSlug/articles";
import { useTranslation } from "../$lang/route";

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

  return { articlesList };
};

export default function Docs() {
  const { articlesList } = useLoaderData<typeof loader>();
  const params = useParams();
  const { lang } = useTranslation();
  return (
    <div className="flex flex-row gap-8">
      <nav className="fixed top-0 bottom-0 w-1/4 items-center px-4 flex-col gap-2 border-r border-border py-32 hidden lg:flex">
        {articlesList.map((article) => (
          <Button
            key={article.slug}
            asChild
            variant={
              params.articleSlug !== article.slug ? "outline" : "secondary"
            }
          >
            <Link
              to={`/${lang}/blog/${article.slug}`}
              key={article.slug}
              className="w-full h-auto"
            >
              <span className="whitespace-normal">{article.title}</span>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="w-1/4 hidden lg:flex" />
      <Outlet />
    </div>
  );
}
