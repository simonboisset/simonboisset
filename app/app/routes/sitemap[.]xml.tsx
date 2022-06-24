import type { Language } from '@prisma/client';
import dayjs from 'dayjs';
import db from '~/core/db.server';

const getUrlPage = ({ language, name, date }: { name: string; language: Language; date: Date }) => {
  const url = `
    <url>
      <loc>https://simonboisset.com/${language}/blog/${name}</loc>
      <lastmod>${dayjs(date).format('YYYY-MM-DD')}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `;
  return url;
};

export const loader = async () => {
  const blogpages = await db.post.findMany({
    where: { publish: true },
    select: { name: true, language: true, date: true },
  });
  const urlPages = blogpages.map(getUrlPage).join('');
  const content = `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://simonboisset.com/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
           ${urlPages}
          </urlset>
      `;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
