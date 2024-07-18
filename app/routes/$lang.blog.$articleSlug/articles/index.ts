import { parse } from "date-fns";
import { convert } from "html-to-text";
import { renderToString } from "react-dom/server";
import { z } from "zod";
import createReactAppWithEsbuild from "./create-react-app-with-esbuild";
import nextStaticBlogTailwind from "./next-static-blog-tailwind";
import publishNpmLibraryWithEsbuild from "./publish-npm-library-with-esbuild";
import sharePackagesMonorepo from "./share-packages-monorepo";
import shareReactNativeMonorepo from "./share-react-native-monorepo";
import typedApiCallGuide from "./typed-api-call-guide";
export const articles = {
  "create-react-app-with-esbuild": createReactAppWithEsbuild,
  "next-static-blog-tailwind": nextStaticBlogTailwind,
  "publish-npm-library-with-esbuild": publishNpmLibraryWithEsbuild,
  "share-packages-monorepo": sharePackagesMonorepo,
  "share-react-native-monorepo": shareReactNativeMonorepo,
  "typed-api-call-guide": typedApiCallGuide,
};
export type ArticleKey = keyof typeof articles;

export const articlesKeys = Object.keys(articles) as ArticleKey[];
export const articleKeySchema = z.enum(articlesKeys as [ArticleKey]);

const mdConfigSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  cover: z.string(),
});

export const extractArticleInfosfromMd = (component: any) => {
  const html = renderToString(component({}) as any);
  const title = convert(html.match(/<h1>(.*?)<\/h1>/)?.[1] || "");
  const description = convert(html.match(/<p>(.*?)<\/p>/)?.[1] || "");
  const cover = html.match(/<img.*?src="(.*?)".*?>/)?.[1];
  const date = parse(
    html.match(/<p>.*?(\d{2}\/\d{2}\/\d{4}).*?<\/p>/)?.[1] || "",
    "dd/MM/yyyy",
    new Date()
  );

  const config = mdConfigSchema.parse({ title, description, cover, date });
  return config;
};
