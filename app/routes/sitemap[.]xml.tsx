import { blog } from "~/contents/blog/blog.server";
import { DEFAULT_LANGUAGE } from "~/contents/i18n/translator";
import { DOCS_DOMAIN } from "~/contents/navigation/domain";

export const loader = async () => {
  const allArticles = blog;
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().split("T")[0];

  const blogUrls = Object.keys(allArticles)
    .map((lang) => {
      const safeLang = lang as keyof typeof allArticles;
      if (lang === DEFAULT_LANGUAGE) {
        return allArticles[DEFAULT_LANGUAGE].map((article) => {
          return `
          <url>
            <loc>${DOCS_DOMAIN}/blog/${article.slug}</loc>
            <lastmod>${currentDateFormated}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
        });
      }
      return allArticles[safeLang].map((article) => {
        return `
        <url>
          <loc>${DOCS_DOMAIN}/${lang}/blog/${article.slug}</loc>
          <lastmod>${currentDateFormated}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
      });
    })
    .filter((v) => !!v)
    .flat();

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOCS_DOMAIN}</loc>
        <lastmod>${currentDateFormated}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${DOCS_DOMAIN}/fr</loc>
        <lastmod>${currentDateFormated}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
      ${blogUrls.join("")}
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
