// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var source_config_default = defineConfig({
  generateManifest: true,
  lastModifiedTime: "git"
});
var blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: (ctx) => ({
      frontmatter: ctx.schema.object({
        title: ctx.schema.string(),
        description: ctx.schema.string().optional(),
        date: ctx.schema.string().datetime(),
        author: ctx.schema.string().default("simon-boisset"),
        image: ctx.schema.string().optional()
      })
    })
  }
});
export {
  blog,
  source_config_default as default
};
