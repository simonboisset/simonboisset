import { BlogPost } from "../authors";
import publishNpmLibraryWithEsbuild from "./20220210-publish-npm-library-with-esbuild.md?raw";
import sharePackagesMonorepo from "./20220210-share-packages-monorepo.md?raw";
import shareReactNativeMonorepo from "./20220210-share-react-native-monorepo.md?raw";
import createReactAppWithEsbuild from "./20220825-create-react-app-with-esbuild.md?raw";
import nextStaticBlogTailwind from "./20231022-next-static-blog-tailwind.md?raw";
import typedApiCallGuide from "./20240121-typed-api-call-guide.md?raw";
import i18nTypeSafeApproach from "./20240719-i18n-type-safe-approach.md?raw";
import createTypescriptLibraryTsUp from "./20240724-create-typescript-library-tsup.md?raw";

export const en: BlogPost[] = [
  {
    date: new Date("2022-02-10"),
    author: "simon-boisset",
    content: publishNpmLibraryWithEsbuild,
    slug: "publish-npm-library-with-esbuild",
  },
  {
    date: new Date("2024-01-21"),
    author: "simon-boisset",
    content: typedApiCallGuide,
    slug: "typed-api-call-guide",
  },
  {
    date: new Date("2022-02-10"),
    author: "simon-boisset",
    content: shareReactNativeMonorepo,
    slug: "share-react-native-monorepo",
  },
  {
    date: new Date("2022-02-10"),
    author: "simon-boisset",
    content: sharePackagesMonorepo,
    slug: "share-packages-monorepo",
  },
  {
    date: new Date("2024-07-19"),
    author: "simon-boisset",
    content: i18nTypeSafeApproach,
    slug: "i18n-type-safe-approach",
  },
  {
    date: new Date("2024-07-24"),
    author: "simon-boisset",
    content: createTypescriptLibraryTsUp,
    slug: "create-typescript-library-tsup",
  },
  {
    date: new Date("2022-08-25"),
    author: "simon-boisset",
    content: createReactAppWithEsbuild,
    slug: "create-react-app-with-esbuild",
  },
  {
    date: new Date("2023-10-22"),
    author: "simon-boisset",
    content: nextStaticBlogTailwind,
    slug: "next-static-blog-tailwind",
  },
];
