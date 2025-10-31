import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkInstall } from 'fumadocs-docgen';

export default defineConfig({
  generateManifest: true,
  lastModifiedTime: 'git',
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: (ctx) => ({
      frontmatter: ctx.schema.object({
        title: ctx.schema.string(),
        description: ctx.schema.string().optional(),
        date: ctx.schema.string().datetime(),
        author: ctx.schema.string().default('simon-boisset'),
        image: ctx.schema.string().optional(),
      }),
    }),
  },
});
