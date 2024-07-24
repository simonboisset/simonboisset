import { format } from "date-fns";
import { getArticlesSortedByDate } from "./$lang.blog.$articleSlug/articles";

export const loader = async () => {
  const articlesList = getArticlesSortedByDate("en");
  const currentDate = new Date();
  const currentDateFormated = format(currentDate, "yyyy-MM-dd");
  const content = `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://www.simonboisset.com/fr</loc>
              <lastmod>${currentDateFormated}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
            <url>
              <loc>https://www.simonboisset.com/en</loc>
              <lastmod>${currentDateFormated}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
            ${articlesList.map(({ slug, date }) =>
              getArticleSiteMap(slug, date)
            )}
          </urlset>
      `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};

const getArticleSiteMap = (slug: string, date: Date) => {
  const dateFormated = format(date, "yyyy-MM-dd");
  return `
  <url>
    <loc>https://www.simonboisset.com/en/blog/${slug}</loc>
    <lastmod>${dateFormated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.simonboisset.com/fr/blog/${slug}</loc>
    <lastmod>${dateFormated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `;
};
