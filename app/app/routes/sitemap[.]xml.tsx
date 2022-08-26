export const loader = async () => {
  const content = `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://simonboisset.com/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
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
