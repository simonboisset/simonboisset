import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { requireBlogPost } from "~/contents/blog/blog.server";
import { DEFAULT_LANGUAGE } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { posts, lang } = requireBlogPost(params);
  const latest = posts[0];
  const url = getAppUrl({
    type: "blog",
    lang,
    slug: latest.slug,
    DEFAULT_LANGUAGE,
  });
  throw redirect(url);
};
