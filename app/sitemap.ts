import { MetadataRoute } from 'next';
import { postSlugs } from './[lang]/blog/[slug]/posts/post';

export default function sitemap(): MetadataRoute.Sitemap {
  const postsMap = postSlugs.flatMap(
    (slug) =>
      [
        {
          url: `https://www.simonboisset.com/fr/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
        {
          url: `https://www.simonboisset.com/en/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
      ] as const,
  );

  return [
    {
      url: 'https://www.simonboisset.com/fr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.simonboisset.com/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.simonboisset.com/fr/legal',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://www.simonboisset.com/en/legal',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://www.simonboisset.com/fr/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://www.simonboisset.com/en/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: 'https://www.simonboisset.com/fr/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.simonboisset.com/en/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    ...postsMap,
  ];
}
