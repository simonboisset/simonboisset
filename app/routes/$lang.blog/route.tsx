import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getSafeLanguage } from "~/domains/i18n";
import { Button } from "~/ui/button";
import { getArticlesSortedByDate } from "../$lang.blog.$articleSlug/articles";
import { useTranslation } from "../$lang/route";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const lang = getSafeLanguage(params.lang);
  const articlesList = getArticlesSortedByDate(lang);

  return { articlesList };
};

export default function Docs() {
  const { articlesList } = useLoaderData<typeof loader>();
  const params = useParams();
  const { lang } = useTranslation();
  return (
    <div className="flex flex-row gap-8">
      <nav className="fixed overflow-y-scroll top-0 bottom-0 h-screen w-1/4 items-center px-4 flex-col gap-2 border-r border-border pt-32 pb-12 hidden lg:flex">
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
              <img
                src={article.cover}
                alt={article.title}
                className="size-16 ml-2 my-2 rounded-md mr-6 object-cover"
              />
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
