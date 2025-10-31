import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/content/layout";
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

  const allPosts = getBlogPosts(lang as Language);
  const posts = allPosts.map((post) => ({
    href: post.url,
    title: post.title,
    slug: post.slug,
  }));

  return { posts };
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <ContentLayout linksTree={posts}>
      <Outlet />
    </ContentLayout>
  );
}
