/// <reference types="vite/client" />
import { fromConfig } from 'fumadocs-mdx/runtime/vite';
import type * as Config from '../source.config';

export const create = fromConfig<typeof Config>();

export const blog = {
  doc: create.doc("blog", "content/blog", import.meta.glob(["./**/*.{mdx,md}"], {
    "query": {
      "collection": "blog"
    },
    "base": "./../content/blog"
  })),
  meta: create.meta("blog", "content/blog", import.meta.glob(["./**/*.{json,yaml}"], {
    "import": "default",
    "base": "./../content/blog",
    "query": {
      "collection": "blog"
    }
  }))
};