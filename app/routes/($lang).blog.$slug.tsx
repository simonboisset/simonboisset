import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { ArticleContent, processedContent } from "~/components/content/article";
import { getBlogPost, getBlogPosts } from "~/lib/source";
import { DEFAULT_LANGUAGE, languageSchema, type Language } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang: rawLang } = params;
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(rawLang || DEFAULT_LANGUAGE);

  const mustRedirect = rawLang === DEFAULT_LANGUAGE || !successLang;
  const lang = validLanguage || DEFAULT_LANGUAGE;

  if (mustRedirect) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const slug = params.slug;

  if (!slug) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const post = getBlogPost(slug, lang as Language);
  if (!post) {
    throw redirect(getAppUrl({ type: "blog", lang, DEFAULT_LANGUAGE }));
  }

  const allPosts = getBlogPosts(lang as Language);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextArticle = allPosts[currentIndex + 1]
    ? {
        href: allPosts[currentIndex + 1].url,
        title: allPosts[currentIndex + 1].title,
        slug: allPosts[currentIndex + 1].slug,
      }
    : undefined;
  const previousArticle = allPosts[currentIndex - 1]
    ? {
        href: allPosts[currentIndex - 1].url,
        title: allPosts[currentIndex - 1].title,
        slug: allPosts[currentIndex - 1].slug,
      }
    : undefined;

  const content = await processedContent(post.body);

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
