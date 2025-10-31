export type Language = 'en' | 'fr';

export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  date: string;
  author: string;
  image?: string;
  body: string;
}

// Map of MDX files - will be populated by the loader
const blogPosts: Record<Language, BlogPost[]> = {
  en: [],
  fr: [],
};

// Import all MDX files dynamically
async function loadBlogPosts(lang: Language): Promise<BlogPost[]> {
  if (blogPosts[lang].length > 0) {
    return blogPosts[lang];
  }

  const files = import.meta.glob('/content/blog/**/*.mdx', { eager: true }) as Record<
    string,
    any
  >;

  const posts: BlogPost[] = [];

  for (const [path, module] of Object.entries(files)) {
    // Extract language and slug from path
    // Path will be like /content/blog/en/slug.mdx
    const match = path.match(/\/content\/blog\/(en|fr)\/(.+)\.mdx$/);
    if (!match) continue;

    const [, fileLang, slug] = match;
    if (fileLang !== lang) continue;

    const frontmatter = (module as any).frontmatter || {};
    const body = (module as any).default || '';

    posts.push({
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description,
      date: frontmatter.date || '',
      author: frontmatter.author || 'simon-boisset',
      image: frontmatter.image,
      body: typeof body === 'string' ? body : '',
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  blogPosts[lang] = posts;
  return posts;
}

export async function getBlogPosts(lang: Language) {
  return loadBlogPosts(lang);
}

export async function getBlogPost(slug: string, lang: Language) {
  const posts = await getBlogPosts(lang);
  return posts.find((post) => post.slug === slug);
}
