import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { ArticleContent, processedContent } from "~/components/content/article";
import { getBlogContent, requireBlogPost } from "~/contents/blog/blog.server";
import { DEFAULT_LANGUAGE } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { posts, lang } = requireBlogPost(params);

  const slug = params.slug;

  if (!slug) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const doc = getBlogContent(slug, lang)?.content;
  if (!doc) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }
  const nextArticle = posts[posts.findIndex((post) => post.slug === slug) + 1];
  const previousArticle =
    posts[posts.findIndex((post) => post.slug === slug) - 1];
  const content = await processedContent(doc);

  return {
    ...content,
    nextArticle,
    previousArticle,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <ArticleContent {...data} />;
}
