import type { Language } from '~/contents/i18n/translator';

export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  date: string;
  author: string;
  image?: string;
  body: string;
  url: string;
}

// This will be populated with the MDX modules
const mdxModules = import.meta.glob<any>('/content/blog/**/*.mdx', { eager: true });

function extractPostsFromModules(lang: Language): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, module] of Object.entries(mdxModules)) {
    // Extract language and slug from path
    // Path will be like /content/blog/en/slug.mdx
    const match = path.match(/\/content\/blog\/(en|fr)\/(.+)\.mdx$/);
    if (!match) continue;

    const [, fileLang, slug] = match;
    if (fileLang !== lang) continue;

    // Extract frontmatter and default export
    const body = module.default || module.body || '';

    posts.push({
      slug,
      title: module.title || '',
      description: module.description,
      date: module.date || '',
      author: module.author || 'simon-boisset',
      image: module.image,
      body: typeof body === 'function' ? '' : String(body),
      url: `/blog/${slug}`,
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getBlogPosts(lang: Language): BlogPost[] {
  return extractPostsFromModules(lang);
}

export function getBlogPost(slug: string, lang: Language): BlogPost | undefined {
  const posts = getBlogPosts(lang);
  return posts.find((post) => post.slug === slug);
}
