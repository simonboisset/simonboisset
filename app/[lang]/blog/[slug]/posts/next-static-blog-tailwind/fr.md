# Créer un blog statique avec Next.js et Tailwind CSS

![next static blog](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/next-blog.webp)

> 22/10/2023

## Introduction

J'ai récemment décidé de créer un blog statique pour partager mes connaissances et mes expériences. J'ai choisi Next.js pour sa simplicité et sa flexibilité. Dans cet article, je vais vous montrer comment créer un blog statique avec Next.js et Tailwind CSS.

Vous pouvez consulter mon [github](https://github.com/simonboisset/simonboisset) pour voir le code de mon blog.

## Tour des outils existants

Il existe de nombreux outils pour créer un blog statique. Voici une liste non exhaustive :

### Docusaurus

[Docusaurus](https://docusaurus.io/) est un générateur de site statique open source créé par Facebook. Il est principalement utilisé pour créer des sites de documentation mais il est possible de l'utiliser pour créer un blog statique.

### Nextra

[Nextra](https://nextra.site/) est un générateur de site statique open source basé sur Next.js. Il est pensé pour créer des documentations comme Docusaurus.

## Pourquoi ne pas utiliser ces outils ?

A vrai dire la première version de mon site était basée sur Docusaurus. C'est un super outil et je le recommande pour toute personne qui souhaite créer un site de documentation clé en main.

Malgré tout, j'avais quand même la sensation d'avoir un setup over ingineered pour un simple blog. Et j'avais envie de partir de zéro pour mieux maitriser les fonctionnalités de mon site.

J'ai donc décidé de réécrire mon site avec Next.js uniquement.

> J'aurais pu utiliser Remix également cela pourra être l'objet d'un prochain article.

## Setup du projet

Je suis parti d'un projet Next.js vierge. J'avais besoin d'un design system. J'ai donc choisi [Tailwind CSS](https://tailwindcss.com/) et [shadcn](https://ui.shadcn.com/) qui est un design system basé sur Tailwind CSS et [radix ui](https://www.radix-ui.com/) pour gérer l'accéssibilité.

Avec ces outils, j'ai pu créer un design system complet et personnalisable et implémenter facilement la landing page de mon site.

Il ne me reste plus qu'a créer les pages de mon blog.

## Les articles du blog

Pour créer les articles de mon blog, j'ai choisi d'utiliser markdown. C'est un format de fichier très simple à écrire et à lire. Il est également très facile de le transformer en HTML.

Je souahaitais également avoir un système de traduction. J'ai donc créé un dossier `posts` dans lequel j'ai créé un dossier par article. Chaque dossier contient un fichier markdown par langue.

```
posts
├── my-first-post
│   ├── en.md
│   └── fr.md
└── my-second-post
    ├── en.md
    └── fr.md
```

## Importer les articles

Afin d'import les articles, j'ai choisi d'utiliser `raw-loader` pour importer les fichiers markdown et `marked` pour parser le markdown en HTML.

```bash
yarn add raw-loader marked
```

Il faut modifier le fichier `next.config.js` pour ajouter le loader `raw-loader` :

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

Ensuite, il faut créer un fichier `posts.ts` qui sera un server action. Ce fichier va importer les fichiers markdown et les parser en HTML.

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

Pour récupérer la liste des articles, j'ai créé une fonction `getPostList` qui va importer tous les articles et les parser en objet.

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

Il ne reste plus qu'a créer un composant pour afficher un post.

On créer un dossier post pour le router et on créer un dossier enfant `[slug]`.

La page `post/[slug]` va récupérer le contenu du post et l'afficher.

```tsx
export default async function BlogPostPage({ params: { slug, lang } }: { params: { slug: string; lang: Locale } }) {
  const md = await getPost(slug, lang);

  return <div dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}
```

Et voila, on a un blog statique avec Next.js.

Bon, par contre ce n'est pas super beau encore. Il va falloir ajouter un peu de style. Et pour cela, on va utiliser Tailwind CSS.

## Ajouter du style

Pour ajouter du style, on va utiliser une extension de Tailwind CSS : `@tailwindcss/typography`.

```js
plugins: [require('@tailwindcss/typography')],
```

Maintenant on peut ajouter un layout à notre page.

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

Maintenant, on a un blog statique avec un style qu'on va pouvoir améliorer au gré de nos envies.

## Conclusion

Si vous souhaitez créer un blog statique, Next.js complété par Tailwind CSS est un combo gagnant. Vous avez un setup simple et flexible qui vous permettra de créer un blog statique à votre image. En plus avec les server components, vous avez la meilleure experience de développement possible.

> Je vous donne un dernier hack pour écrire vos articles. Utiisez copilot pour vous assister dans l'écriture de vos articles. C'est un gain de temps énorme. Il suffit de l'activer dans les settings de VSCode.

```json
"github.copilot.enable": {
    "markdown": true
  }
```

---

Je suis Simon Boisset, développeur fullstack freelance. Je travaille principalement avec React, React Native et Node.js. Je suis disponible pour des missions de développement ou de conseil. N'hésitez pas à me contacter sur [mon site](https://simonboisset.com/).
