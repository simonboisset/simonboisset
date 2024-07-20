import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSafeLanguage } from "~/domains/i18n";
import Markdown from "../$lang.docs/mardown";
import { useTranslation } from "../$lang/route";
import {
  articleKeySchema,
  articles,
  articlesKeys,
  extractArticleInfosfromMd,
} from "./articles";
import "./gh-md.css";
import "./hljs.css";
// import copyCodeScript from "./btn-md.js";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const articleSlug = articleKeySchema.safeParse(params.articleSlug).data;
  const lang = getSafeLanguage(params.lang);

  const article = articleSlug ? articles[articleSlug] : undefined;
  if (!article || !articleSlug) {
    throw redirect(`/${lang}/blog/${articlesKeys[0]}`, { status: 301 });
  }

  const Article = article[lang];
  const config = extractArticleInfosfromMd(Article);
  return { ...config, slug: articleSlug };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export default function Docs() {
  const { slug } = useLoaderData<typeof loader>();
  const { lang } = useTranslation();

  const Article = articles[slug][lang];

  return (
    <Markdown>
      <Article />
    </Markdown>
  );
}
