import 'server-only';

import { redirect } from 'next/navigation';
import z from 'zod';
import { Locale } from '../../../dictionaries';

export const postSlugs = [
  'next-static-blog-tailwind',
  'share-packages-monorepo',
  'share-react-native-monorepo',
  'publish-npm-library-with-esbuild',
  'create-react-app-with-esbuild',
  'typed-api-call-guide',
] as const;
export const postSlugSchema = z.enum(postSlugs);

export const getPost = async (slug: string, locale: Locale) => {
  const safeSlug = postSlugSchema.safeParse(slug);
  if (!safeSlug.success) {
    throw redirect('/blog');
  }
  const post = await import(`./${slug}/${locale}.md`).then((module) => module.default as string);
  return post;
};

export const getPostList = async (locale: Locale) => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await import(`./${slug}/${locale}.md`).then((module) => module.default as string);

      return {
        slug,
        title: getTitleFromMarkdown(post),
        preview: getPreviewFromMarkdown(post),
        img: getImgFromMarkdown(post),
        date: getDateFromMarkdown(post),
      };
    }),
  );
  return posts;
};

export const postMetadata = async (slug: string, locale: Locale) => {
  const post = await getPost(slug, locale);
  return {
    slug,
    title: getTitleFromMarkdown(post),
    preview: getPreviewFromMarkdown(post),
    img: getImgFromMarkdown(post),
    date: getDateFromMarkdown(post),
  };
};

export const getTitleFromMarkdown = (markdown: string) => {
  const title = markdown.match(/# (.*)/)?.[1];
  return title;
};

export const getPreviewFromMarkdown = (markdown: string) => {
  const preview = markdown.match(/## (.*)\n\n(.*)/)?.[2];
  return preview;
};

export const getImgFromMarkdown = (markdown: string) => {
  const img = markdown.match(/!\[(.*)\]\((.*)\)/)?.[2];
  return img;
};

const getDateFromMarkdown = (markdown: string): Date => {
  const date = markdown.match(/>: (.*)/)?.[1];

  return date ? new Date(date) : new Date();
};
