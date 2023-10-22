# Create a static blog with Next.js and Tailwind CSS

![next static blog](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/next-blog.webp)

> 22/10/2023

## Introduction

I recently decided to create a static blog to share my knowledge and experiences. I chose Next.js for its simplicity and flexibility. In this article, I will show you how to create a static blog with Next.js and Tailwind CSS.

You can check out my [github](https://github.com/simonboisset/simonboisset) to see the code of my blog.

## Tour of existing tools

There are many tools to create a static blog. Here is a non-exhaustive list:

### Docusaurus

[Docusaurus](https://docusaurus.io/) is an open source static site generator created by Facebook. It is mainly used to create documentation sites but it is possible to use it to create a static blog.

### Nextra

[Nextra](https://nextra.site/) is an open source static site generator based on Next.js. It is very thought out to create documentations like Docusaurus.

## Why not use these tools?

To be honest the first version of my site was based on Docusaurus. It's a great tool and I recommend it for anyone who wants to create a turnkey documentation site.

Nevertheless, I still had the feeling that I had an over ingineered setup for a simple blog. And I wanted to start from scratch to better master the features of my site.

So I decided to rewrite my site with Next.js only.

> I could have used Remix as well, this could be the subject of a future article.

## Project setup

I started from a blank Next.js project. I needed a design system. So I chose [Tailwind CSS](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/) which is a design system based on Tailwind CSS and [radix ui](https://www.radix-ui.com/) to manage accessibility.

With these tools, I was able to create a complete and customizable design system and easily implement the landing page of my site.

Now I just need to create the pages of my blog.

## Blog articles

To create the articles of my blog, I chose to use markdown. It's a very simple format to write and read. It is also very easy to transform it into HTML.

I also wanted to have a translation system. So I created a `posts` folder in which I created a folder for each article. Each folder contains one markdown file per language.

```
posts
├── my-first-post
│   ├── en.md
│   └── fr.md
└── my-second-post
    ├── en.md
    └── fr.md
```

## Import articles

In order to import the articles, I chose to use `raw-loader` to import the markdown files and `marked` to parse the markdown into HTML.

```bash
yarn add raw-loader marked
```

You have to modify the `next.config.js` file to add the `raw-loader` loader:

```js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
```

Then, you have to create a `posts.ts` file which will be a server action. This file will import the markdown files and parse them into HTML.

```ts
import 'server-only';

import { redirect } from 'next/navigation';
import z from 'zod';
import { Locale } from '../../../dictionaries';

const postSlugs = ['my-first-post', 'my-second-post'] as const;
export const postSlugSchema = z.enum(postSlugs);

export const getPost = async (slug: string, locale: Locale) => {
  const safeSlug = postSlugSchema.safeParse(slug);
  if (!safeSlug.success) {
    throw redirect('/blog');
  }
  return import(`./${slug}/${locale}.md`).then((module) => module.default as string);
};
```

To get the list of articles, I created a `getPostList` function that will import all the articles and parse them into an object.

```ts
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
```

Now we just have to create a component to display a post.

We create a post folder for the router and we create a child folder `[slug]`.

The `post/[slug]` page will get the content of the post and display it.

```tsx
export default async function BlogPostPage({ params: { slug, lang } }: { params: { slug: string; lang: Locale } }) {
  const md = await getPost(slug, lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
```

And voila, we have a static blog with Next.js.

Well, on the other hand it's not super beautiful yet. We'll have to add some style. And for that, we'll use Tailwind CSS.

## Add style

To add style, we will use a Tailwind CSS extension: `@tailwindcss/typography`.

```js
plugins: [require('@tailwindcss/typography')],
```

Now we can add a layout to our page.

```tsx
export default async function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'prose mx-auto prose-p:text-justify prose-a:underline prose-a:font-bold',
        'prose-img:rounded-lg prose-img:shadow-lg prose-img:object-cover prose-img:p-0',
        'prose-headings:text-primary prose-p:text-primary prose-code:text-primary',
        'prose-li:text-primary prose-a:text-primary prose-li:marker:text-primary',
        'w-full max-w-screen-lg mx-auto mt-32 px-12 prose-pre:text-primary prose-pre:bg-foreground/10',
        'prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:overflow-x-auto prose-pre:p-6',
      )}>
      {children}
    </div>
  );
}
```

Now, we have a static blog with a style that we will be able to improve as we wish.

## Conclusion

If you want to create a static blog, Next.js complemented by Tailwind CSS is a winning combo. You have a simple and flexible setup that will allow you to create a static blog in your image. Plus with server components, you have the best development experience possible.

> I'll give you one last hack for writing your articles. Use copilot to assist you in writing your articles. It's a huge time saver. Just activate it in the VSCode settings.

```json
"github.copilot.enable": {
    "markdown": true
  }
```

---

I'm Simon Boisset, freelance fullstack developer. I mainly work with React, React Native and Node.js. I'm available for development or consulting missions. Feel free to contact me on [my website](https://simonboisset.com/).
